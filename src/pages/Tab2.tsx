import React from 'react';
import {camera, trash, close, logoAndroid} from 'ionicons/icons';
import {IonGrid, IonCol, IonRow, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonImg } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import {usePhotoGalery} from '../hooks/usePhotoGalery';


const Tab2: React.FC = () => {
  const {photos, takePhoto} = usePhotoGalery();
  
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
                  <IonImg src = {photo.webViewPath}/>

              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
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
