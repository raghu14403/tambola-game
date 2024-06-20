import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react"
// import { Box } from "../emotion-styles/commonStyle"
import axios from "axios";
import ShortUniqueId from "short-unique-id";

function JoinRoom(){

    const [id,setId]=useState<string>("");

    const [joinId,setJoinId]=useState<boolean>(false);

    const [playerName,setPlayerName]=useState("");
    const [playerNameGiven,setPlayerNameGiven]=useState(false);

    const [tickets,setTickets]=useState();

    

    function toSetId(value: string){
        setId(()=>value);
    }

    function joinRoom(event: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>){
        event.preventDefault();
        setJoinId(true);
    }

    return <>
        {joinId === true?
        <>
            {playerNameGiven?<JoinedComponent id={id} playerName={playerName} tickets={tickets}/>:<PlayerName setPlayerName={setPlayerName} setPlayerNameGiven={setPlayerNameGiven} setTickets={setTickets}/>}
        </>
        :<><form onSubmit={(e)=>joinRoom(e)}>
            <input type="text" placeholder="Enter valid Id" onChange={(event)=>toSetId(event.target.value)}/>
        </form>
        <button onClick={(e)=>joinRoom(e)}>Join</button></>}
    </>
    
}

function JoinedComponent(props:any){
    const uuId=new ShortUniqueId({length:5});
    useEffect(()=>{

        const playerId=uuId.rnd();

        axios.post(`http://localhost:8080/player/${playerId}`,{
            "name":`${props.playerName}`
        }).then(()=>{
            axios.post(`http://localhost:8080/players/${playerId}/room/${props.id}`,{
                "tickets":`${props.tickets}`
            }).then(()=>{
                console.log("Joined the room with "+props.id);
            }).catch(()=>{
                console.error("Something went wrong...")
            })
        }).then(()=>{

        }).catch(()=>{
            console.error("Something went wrong when joining the room "+props.id)
        })
    },[props.id])
    return<>
    <p>Joined</p>
    <p>Waiting for the host to start...</p>
    </>
}

function PlayerName(props:any){

    function SettingPlayerName(event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>){
        event.preventDefault();
        props.setPlayerNameGiven(true)
    }

    function setTicketsNumber(value: number): void {
        props.setTickets(value)
    }

    return(
        <>
            <form>
                <input type="text" placeholder="Enter name" onChange={(event)=>props.setPlayerName(event.target.value)}/>
                <input type="number" min={1} max={6} onChange={(event)=>setTicketsNumber(Number(event.target.value))}/>
            </form>
            <button onClick={(e)=>SettingPlayerName(e)}>Submit Player Name</button>
    </>
    )
}

export default JoinRoom