import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonFabButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {laptopOutline, terminal} from 'ionicons/icons';
import {Plugins} from '@capacitor/core';


const Tab1: React.FC = () => {
  const {CustumNativePlugins} = Plugins;
  var mac2 = "";
  const getMacAddress = async () =>{
    const  mac = await CustumNativePlugins.getMacAddress();
    
   return "asda"; 
  };
  
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Get Mac Address</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mac</IonTitle>

          </IonToolbar>
        </IonHeader>
        <ExploreContainer name =   "Hot reload"/>        
        {getMacAddress()}
      </IonContent>
      <IonFab vertical = "bottom" horizontal = "center" slot = "fixed">
        <IonFabButton>          
          <IonIcon onClick = {() => getMacAddress}
          
          icon = {laptopOutline}>

          </IonIcon>
        </IonFabButton>
        
      </IonFab>
    </IonPage>
  );
};

export default Tab1;
