import { useNavigate } from "react-router-dom";
import {  Button, Box } from "../emotion-styles/commonStyle"
import axios from "axios";

function HomePage(){

    const navigate=useNavigate();

    function check(){
        axios.post('http://localhost:8080/room',{
            "name":"Naruto's Room"
        }).then((res)=>{
            console.log(res);
        }).catch((err)=>{
            console.error("Couldn't complete the POST request "+err)
        })
    }

    function moveToHost(){
        navigate('/host')
    }
    function moveToJoin(){
        navigate('/join')
    }

    return(<Box display="flex" alignItems="center" justifyContent="center" gap="15px" >
            <Button borderTop={"50px"} borderLeft={"50px"} onClick={moveToHost}></Button>
            {/* <Box style={{height:"200px", width:"200px", borderRadius:"100px"}} position={"relative"} top={"100px"} background={"black"}/> */}
            <Button borderBottom="50px" borderRight="50px" onClick={moveToJoin}></Button>
        </Box>)
}

export default HomePage