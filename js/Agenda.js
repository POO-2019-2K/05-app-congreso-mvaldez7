//agenda de distrubucion//

export default class Agenda{
    constructor(workshopsTable, membersTable){
        this.workshopsTable = workshopsTable;
        this.membersTable = membersTable;
        this.totalWorkshops = [];
        this.totalMembers = [];
        this.initWSTable();
    }

    initWSTable(){
        this.workshopsTable.innerHTML = "";
        if (localStorage.getItem("workshops")) {
            this.totalWorkshops = JSON.parse(localStorage.getItem("workshops"));

            let workshopsSelect = document.querySelector("#workshopsSelect");
            let showWorkshopSelect = document.querySelector("#showWorkshopSelect");
            workshopsSelect.style.height = "40px";
            showWorkshopSelect.style.height = "40px";
                        
            this.totalWorkshops.forEach( workshop => {

                let optionToRegister = document.createElement("option");
                optionToRegister.value = workshop.name;
                optionToRegister.innerHTML = workshop.name;

                let optionToShow = document.createElement("option");
                optionToShow.value = workshop.name;
                optionToShow.innerHTML = workshop.name;

                workshopsSelect.appendChild(optionToRegister);
                showWorkshopSelect.appendChild(optionToShow);

                this.showWSInTable(workshop);
            });

            showWorkshopSelect.addEventListener("change", () => {
                
                this.membersTable.innerHTML = "";
                this.totalWorkshops.forEach( workshop => {
                    if (workshop.name == showWorkshopSelect.value) {
                        
                        document.querySelector("#avaliable-Places").innerHTML = workshop.places - workshop.members.length;

                        workshop.members.forEach( member => {
                            this.showMembersInTable(member);
                        });
                        
                    }else{
                        // !alert¡//
                        document.querySelector("#avaliable-Places").innerHTML = "";
                    }
                });
            })       
        }
    }

    addWorkshop(workshop){
        this.totalWorkshops.push(workshop);
        localStorage.setItem("workshops", JSON.stringify(this.totalWorkshops));
        this.initWSTable();
    }

    addMemberToWS(member, workshopName){

        this.totalWorkshops.forEach( workshop => {
            if (workshopName == workshop.name) {                

                if (workshop.members.length == workshop.places) {
                    alert("Ya no hay lugares disponibles");
                }else{
                    let existenceMember = this.findMember(workshop.members, member);
                    if (existenceMember == true) {
                        alert("No es posible continuar. Ya estas registrado");
                    }else{
                        workshop.members.push(member);
                        localStorage.setItem("workshops", JSON.stringify(this.totalWorkshops));
                        alert("Registrado!!");
                    }     
                }
            } 
        });        
    }

    findMember(wsMembers, memberOBJ){
        let value = false;
        wsMembers.forEach( member => { 
            if (memberOBJ.name == member.name) {
                value = true;
            }
        });
        return value;
    }

    showMembersInTable(member){
        let row = this.membersTable.insertRow(-1);
            
        let cellMemberName = row.insertCell(0);
        let cellMemberEmail = row.insertCell(1);
        let celMemberBirthday = row.insertCell(2);
        let cellDeleteMember= row.insertCell(3);

        cellMemberName.innerHTML = member.name;
        cellMemberEmail.innerHTML = member.email;
        celMemberBirthday.innerHTML = member.birthdate;

        let deleteMemberButton = document.createElement("button");
        deleteMemberButton.className = "btn btn-outline-danger btn-sm";
        deleteMemberButton.innerHTML = "X";
        deleteMemberButton.style.fontSize = "14px";
        deleteMemberButton.style.borderRadius = "6px";

        cellDeleteMember.appendChild(deleteMemberButton);
        deleteMemberButton.addEventListener("click", () => {
 
        let showWorkshopSelect = document.querySelector("#showWorkshopSelect");
        this.totalWorkshops.forEach( workshop => {

                if (workshop.name == showWorkshopSelect.value) {

                    // console.log();
                    // let i = this.totalWorkshops.indexOf( workshop );
                    // this.totalWorkshops[ i ].members.

                    // workshop.members.forEach( member => {

                    //     if (member.name == row.cells[0].innerHTML) {
                            
                    //         this.totalWorkshops.members.splice( this.totalWorkshops.members.indexOf(member) , 1 );
                    //         localStorage.setItem("workshops", JSON.stringify(this.totalWorkshops));
                    //         this.initWSTable();
                    //     }
                    
                    // });
                }
            });
                
        alert("ELIMINADO EXITOSAMANTE");
            
        });
    }

    showWSInTable(workshop){    
        let row = this.workshopsTable.insertRow(-1);
            
        let cellWorkshopName = row.insertCell(0);
        let cellWorkshopStart = row.insertCell(1);
        let cellWorkshopEnd = row.insertCell(2);
        let cellWorkshopPlaces = row.insertCell(3);
        let cellWorkshopHours = row.insertCell(4);
        let cellDeleteWorkshop = row.insertCell(5);

        cellWorkshopName.innerHTML = workshop.name;
        cellWorkshopStart.innerHTML = workshop.start;
        cellWorkshopEnd.innerHTML = workshop.end;
        cellWorkshopPlaces.innerHTML = workshop.places;
        cellWorkshopHours.innerHTML = workshop.hours;

        let deleteWorkshopButton = document.createElement("button");
        deleteWorkshopButton.className = "btn btn-outline-danger btn-sm";
        deleteWorkshopButton.innerHTML = "X";
        deleteWorkshopButton.style.fontSize = "14px";
        deleteWorkshopButton.style.borderRadius = "6px";

        cellDeleteWorkshop.appendChild(deleteWorkshopButton);
        deleteWorkshopButton.addEventListener("click", () => {

            if (workshop.members.length > 0) {
                alert("NO ES POSIBLE, EL GRUPO NO ESTA VACIO");
            }else{
                this.totalWorkshops.forEach( workshop => {
                    
                    if (workshop.name == row.cells[0].innerHTML) {
                        this.totalWorkshops.splice( this.totalWorkshops.indexOf(workshop) , 1 );
                        localStorage.setItem("workshops", JSON.stringify(this.totalWorkshops));
                        this.initWSTable();
                    }
                    
                });
                
                alert("ELIMINADO EXITOSAMANTE");
            }

        });

    }



}