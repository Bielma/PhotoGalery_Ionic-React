import React, {useState, useEffect} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonFabButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import {laptopOutline, terminal} from 'ionicons/icons';
import {Plugins} from '@capacitor/core';




const Tab1: React.FC = () => {

  const {CustumNativePlugins} = Plugins;
  const [mac, setMac] = useState("");

  
  const getMacAddress = async () =>{
    const  res = await CustumNativePlugins.getMacAddress();
    console.log(res);
    setMac(res.mac);
    //setMac(res['mac']);
    
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
        <ExploreContainer name ={mac} />        
        
      </IonContent>
      <IonFab vertical = "bottom" horizontal = "center" slot = "fixed">
        <IonFabButton>          
          <IonIcon onClick = {() => getMacAddress()}
          
          icon = {laptopOutline}>

          </IonIcon>
        </IonFabButton>
        
      </IonFab>
    </IonPage>
  );
};

export default Tab1;
