import React, {useState} from 'react';
import {camera, trash, close, logoAndroid} from 'ionicons/icons';
import {IonGrid, IonCol, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonImg, IonActionSheet } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import {usePhotoGalery, Photo} from '../hooks/usePhotoGalery';


const Tab2: React.FC = () => {
  const {photos, takePhoto, deletePhoto} = usePhotoGalery();
  const [photoToDelete, setPhotoToDelete] = useState<Photo>();

  return ( 
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Galery</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>            
            {photos.map((photo, index) => (
              <IonCol size ="6" key = {index}>
                  <IonTitle > {'Photo '+index+1}</IonTitle>
                  <IonImg onClick={()=> setPhotoToDelete(photo)}
                  src = {photo.base64 ?? photo.webViewPath}/>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <IonActionSheet 
          isOpen  = {!!photoToDelete}
          buttons = {[{
            text: 'Delete',
            role: 'destructive',
            icon: trash,
            handler:() =>{
              if(photoToDelete){
                deletePhoto(photoToDelete);
                setPhotoToDelete(undefined);
              }
            }

          }, {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          
          }]}
          onDidDismiss = {() => setPhotoToDelete(undefined)}
        />
      </IonContent>
        <IonFab vertical = "bottom" horizontal = "center" slot= "fixed">
          <IonFabButton onClick = {()=> takePhoto()}>
            <IonIcon icon = {camera}></IonIcon> 
          </IonFabButton> 
        </IonFab>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        
      
    </IonPage>
  );
};

export default Tab2;
