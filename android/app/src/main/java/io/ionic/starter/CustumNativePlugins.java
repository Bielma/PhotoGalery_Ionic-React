package io.ionic.starter;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.NativePlugin;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;


import java.net.NetworkInterface;
import java.util.Collections;
import java.util.List;

@NativePlugin()
public class CustumNativePlugins extends Plugin {

    @PluginMethod
    public void getMacAddress(PluginCall call){
        String macAddress = "";
        try {
            String interfaceName = "wlan0";
            List<NetworkInterface> interfaces = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                if (!intf.getName().equalsIgnoreCase(interfaceName)){
                    continue;
                }
                byte[] mac = intf.getHardwareAddress();
                StringBuilder buf = new StringBuilder();
                for (byte aMac : mac) {
                    buf.append(String.format("%02X:", aMac));
                }
                if (buf.length()>0) {
                    buf.deleteCharAt(buf.length() - 1);
                }
                macAddress =  buf.toString();
            }
        } catch (Exception ex) { } // for now eat exceptions
        JSObject res = new JSObject();
        res.put("mac", macAddress);
        Log.d("aber", macAddress);
        call.resolve(res);



    }






}
