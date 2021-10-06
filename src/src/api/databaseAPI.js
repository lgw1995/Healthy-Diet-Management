import fire from "./commonFirebase";
import storageUtils from "../utils/storageUtils";
import memoryUtils from "../utils/memoryUtils";
import ajax from '../api/ajax'
export default {
    GetBmi(wght,dist){
        var fac = wght / ((dist / 100.0)*(dist / 100.0));


        return fac.toString();
    },

    GetBmitostring(fac)
    {
        var fst = "";
        if(fac<18.5) fst = "Underweight <18.5 ";
        if(fac>=18.5 && fac<25) fst = "Normal weight  18.5–24.9";
        if(fac>=25 && fac<30) fst = "Overweight 25–29.9";
        if(fac>=30) fst = "Obesity BMI of 30 or greater";
        return fst.toString();
    },


    writeUserPlant(userId,plantName,path) {
        var user = memoryUtils.username;
        fire.database().ref(path + userId).set({
            ID: user,
            UserPlant: plantName
        });
    },
    //Get the name of the plant that the current user likes
    queryCollectionPlant(path,queryID)
    {
        var user = memoryUtils.username;
        var ref = fire.database().ref(path);
        var arry ={};

        ref.orderByChild(queryID).equalTo(user).on("child_added", function(snapshot) {
            arry = snapshot.toJSON();
        });
        return arry
    },


}
