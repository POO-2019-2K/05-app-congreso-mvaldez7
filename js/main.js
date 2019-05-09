//Imprtaciones al main//

import Tienda from "./Tienda.js";
import Agenda from "./Agenda.js";
import Miembros from "./Miembros.js";
import Agenda from "./Agenda.js";

class main{
    constructor(){
        
        let schedule = new Agenda(
            document.querySelector("#workshopsTable"),
            document.querySelector("#membersTable")
        );

        document.querySelector("#createWSButton").addEventListener("click", () => {
        
            let workshop = new Tienda(
                document.querySelector("#wsName").value,
                document.querySelector("#startDate").value,
                document.querySelector("#endDate").value,
                document.querySelector("#places").value,
                document.querySelector("#time").value,
            );
            
            schedule.addWorkshop(workshop);
            
        });


        document.querySelector("#addMemberButton").addEventListener("click", () => {

            let member = new Miembros(
                document.querySelector("#memberName").value,
                document.querySelector("#email").value,
                document.querySelector("#birthdate").value,
            );

            let workshopName =  document.querySelector("#workshopsSelect").value;

            schedule.addMemberToWS(member, workshopName);

        });

    }
}

let m = new main();