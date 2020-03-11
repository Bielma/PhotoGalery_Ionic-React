import {useState, useEffect} from 'react';
import {useCamera} from '@ionic/react-hooks/camera';
import {useFilesystem, base64FromPath} from '@ionic/react-hooks/filesystem';
import {isPlatform} from '@ionic/react';
import {useStorage} from '@ionic/react-hooks/storage';
import {CameraResultType, CameraSource, CameraPhoto, Capacitor, FilesystemDirectory} from '@capacitor/core';
import { camera } from 'ionicons/icons';
const PHOTO_STORAGE = "photos";


export function usePhotoGalery(){
    
    const {getPhoto} = useCamera();

    const [photos, setPhotos] = useState<Photo[]>([]);
    const {deleteFile, getUri, readFile, writeFile} = useFilesystem();
    const PHOTO_STORAGE = "Fotos";    
    const {get, set } = useStorage();
    
    useEffect (()=>{
        const loadSaved = async() => {
            const photoString = await get('photos');
            const photo = (photoString ? JSON.parse(photoString) : []) as Photo[];
            for (let photo of photos){
                const file = await readFile({
                    path: photo.filePath,
                    directory: FilesystemDirectory.Data
                });
                photo.base64 = 'data:image/jpeg;base64,${file.data}';   
            }
            setPhotos(photos);
        };
        loadSaved();

    }, [get, readFile]);


    const deletePhoto = async (photo: Photo) => {
        const newPhotos = photos.filter(p=> p.filePath !== photo.filePath);

        set(PHOTO_STORAGE, JSON.stringify(newPhotos));

        //delete photo file from filesystem
        const fileName = photo.filePath.substr  (photo.filePath.lastIndexOf('/' )+1);
        await deleteFile({
            path: fileName,
            directory: FilesystemDirectory.Data
        });
        setPhotos(newPhotos);       
 
    };

    const takePhoto = async () => {
        const fileName = new Date().getTime + '.jpeg';
        const cameraPhoto = await getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality:100            
            
        });



        const savePicture = async (photo: CameraPhoto, fileName: string) => {
            const base64Data = await base64FromPath(photo.webPath!);
            await writeFile({
              path: fileName,
              data: base64Data,
              directory: FilesystemDirectory.Data
            });
            return getPhotoFile(photo, fileName);
          };
          
          const getPhotoFile = async (cameraPhoto: CameraPhoto, fileName: string): Promise<Photo> => {
            return {              
              filePath: fileName,              
              webViewPath:cameraPhoto.webPath
            };
          };    
          

/*
        const newPhotos = [{
            filePath: fileName,
            webViewPath: cameraPhoto.webPath
        },...photos];*/
        const savedFileImage = await savePicture(cameraPhoto, fileName);
        const newPhotos = [savedFileImage, ...photos];
        setPhotos(newPhotos)
        set(PHOTO_STORAGE,  JSON.stringify(newPhotos.map(p =>{
            const photoCopy = {...p};
            delete photoCopy.base64;
            return photoCopy;
        })));

    };

    return {
        deletePhoto,
        photos,
        takePhoto
    };
     
}


export interface Photo{
    filePath: string;
    webViewPath?: string;
    base64?: string;
}

