import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Box,Text } from "../emotion-styles/commonStyle";
import ShortUniqueId from "short-unique-id";

// interface PassDownProps{
//     name?:string;
//     setName:(name:string|null)=>void;
//     setIsHost:(isHost:boolean|null)=>void
// }

function Host(){
    const [name,setName]=useState<string>("");
    const [tickets,setTickets]=useState<number>();
    const [isHost,setIsHost]=useState<boolean>(false);

    // const myContext=createContext<PassDownProps|undefined>(undefined);
    
    return <>
        {!isHost?<HostName name={name} setName={setName} setIsHost={setIsHost} tickets={tickets} setTickets={setTickets}/>:<HostDashboard name={name} tickets={tickets}/>}
    </>
}

function HostDashboard(props: any){

    const [id,setId]=useState<string>("");

    const uuId=new ShortUniqueId({length:5});

    useEffect(()=>{
        const playerId:string=uuId.rnd();
        axios.post(`http://localhost:8080/player/${playerId}`,{
            "name":`${props.name}`,
            "numOfTickets":`${props.tickets}`
        }).then(()=>{
            axios.get('http://localhost:8080/id').then((response)=>{
                axios.post(`http://localhost:8080/room/${response.data}`,{
                    "name":`${props.name}'s Room`,
                    "host":`${playerId}`
                }).then((res)=>{
                    console.log(res);
                    setId(response.data);
                }).catch((err)=>{
                    console.error("Couldn't complete the POST request "+err)
                })
                
            }).catch((error)=>{
                console.error(error)
            })
        }).catch(()=>{
            console.error("Something went wrong. You cannot host a room")
        })
    },[])
    
    function deleteAll(){
        axios.delete('http://localhost:8080/rooms')
        .then((response)=>{
            console.log(response)
        })
        .catch((error)=>{
            console.log(error)
            alert("Cannot delete the rooms")
        })
    }
    
    return<div>
        <Text>{id}</Text>
        <button onClick={deleteAll}>Click it</button>
    </div>
}

function HostName(props:any){

   

    function setHostName(value: string){
        props.setName(value);
    }

    function submitData(){
        props.setIsHost(true);
    }

    function setTicketsNumber(value: number): void {
        props.setTickets(value)
    }

    return <>
        <Box>
            <form onSubmit={submitData}>
                <input type="text" value={props.name} onChange={(event)=>setHostName(event.target.value)}/>
                <input type="number" min={1} max={6} onChange={(event)=>setTicketsNumber(Number(event.target.value))}/>
            </form>
            <button onClick={submitData}>Submit Host name</button>
        </Box>
    </>
}



export default Host;