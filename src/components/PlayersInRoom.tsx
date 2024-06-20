// import ReactFlow, { Background } from "reactflow";
// import { FlexBox } from "../emotion-styles/commonStyle";
// import { useEffect, useState } from "react";
// import 'reactflow/dist/style.css';

import axios from "axios"
import { useCallback, useEffect, useState } from "react"

// function PlayersInRoom() {
//     const hostID: number = 7;
//     const gameAPI = [
//         {
//             id: 7,
//             name: "Kakashi"
//         },
//         {
//             id: 1,
//             name: "Naruto"
//         },
//         {
//             id: 2,
//             name: "Sasuke"
//         },
//         {
//             id: 3,
//             name: "Sakura"
//         }
//     ];

//     interface Node {
//         id: string;
//         data: {
//             label: string;
//         };
//         position: {
//             x: number;
//             y: number;
//         };
//     }

//     interface Edge {
//         id: string;
//         source: string;
//         target: string;
//     }
    
//     const [nodes, setNodes] = useState<Node[]>([]);
//     const [edges, setEdges] = useState<Edge[]>([]);    
//     function call() {
//         console.log(nodes);
//     }

//     useEffect(() => {
//         const nodeList: Node[] = gameAPI.map((mem, index) => ({
//             id: mem.id.toString(),
//             data: { label: mem.name },
//             position: { x: 100, y: 100 * index }
//         }));
//         setNodes(nodeList);
//         call();
//     }, []);

//     useEffect(() => {
//         const edgeList: Edge[] = gameAPI.map((mem) => ({
//             id: `edge-${hostID}-${mem.id}`,
//             source:mem.id.toString(),
//             target:hostID.toString() 
//         }));
//         setEdges(edgeList);
//     }, []);
    
//     return (
//         <FlexBox style={{ height: '100vh', width: '100vw' }}>
//             <ReactFlow nodes={nodes} edges={edges}>
//                 <Background />
//             </ReactFlow>
//         </FlexBox>
//     );
// }

// export default PlayersInRoom;


// import { useCallback } from "react";
// import ReactFlow, { Background, Connection, Controls, Edge, MiniMap, Panel, addEdge, useEdgesState, useNodesState } from "reactflow";
// import 'reactflow/dist/style.css';
// import TextUpdaterNode from "./TypesOfNodes";


// const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' } },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
//     { id: '3', position: { x: 300, y: 100 }, data: { label: '3' } },
//   ];

// const initialEdges=[
//     {
//         id:'1-2',
//         source:'1',
//         target:'2'
//     }
// ]
// const nodes = [
//     {
//       id: 'node-1',
//       type: 'textUpdater',
//       position: { x: 0, y: 0 },
//       data: { value: 123 },
//     },
//   ];

// const nodeTypes = { textUpdater: TextUpdaterNode };
// function PlayersInRoom(){

//     const [nodes,setNodes,onNodesChange]=useNodesState(initialNodes);
//     const [edges,setEdges,onEdgesChange]=useEdgesState(initialEdges);

//     const onConnect=useCallback((newEdgeInfo: Edge | Connection)=>{
//         console.log(newEdgeInfo)
//         console.log(edges)
//         setEdges((edge)=>addEdge(newEdgeInfo,edge))
//     },[setEdges])

//     return <div style={{height:'100vh', width:'100vw'}}>
//         <ReactFlow selectNodesOnDrag={false} nodes={nodes} nodeTypes={nodeTypes} onConnect={onConnect} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
//             <Controls />
//             <MiniMap />
//             <Background color="#000"/>
//         </ReactFlow>
//     </div>
// }


import ReactFlow,{Background, Controls, NodeChange, applyNodeChanges, useEdgesState, useNodesState} from "reactflow";
import 'reactflow/dist/style.css';

function PlayersInRoom(){

    const [players,setPlayers]=useState<PlayerDetails[]>([]);
    const [roomName,setRoomName]=useState<string>("Hello");
    const [nodes,setNodes,onNodesChange]=useNodesState([]);
    const [edges,setEdges,onEdgesChange]=useEdgesState([]);

    type Node = {
        id: string;
        data: {
            label: string;
        };
        position: {
            x: number;
            y: number;
        };
    };

    type Edge={
        id:string;
        source:string;
        target:string;
    }

    type PlayerDetails={
        identity:string;
        name:string;
    }

    useEffect(()=>{
        axios.get(`http://localhost:8080/room/SY5841/players`)
        .then((response)=>{
            setPlayers(response.data.players)
            console.log(response)
            setRoomName(response.data.roomName)
        })
        .catch(()=>{
            console.error("Something went wrong in fetching room players")
        })
    },[])

    useEffect(()=>{
        const initialNodes=[{
            id:"SY5841",
            data:{
                label:roomName
            },
            position:{
                x:250,
                y:0
            }
        }]
        players.forEach((player, index) => {
            const node: Node = {
                id: player.identity,
                data: {
                    label: player.name
                },
                position: {
                    x: (index+1)*200,
                    y: 100
                }
            };
            initialNodes.push(node);
        });
        console.log(initialNodes)
        setNodes(initialNodes)
    },[players])

    useEffect(()=>{
        const initialEdges:Edge[]=[]

        players.forEach(player => {
            const edge:Edge={
                id:"SY5841"+player.identity,
                source:"SY5841",
                target:player.identity
            }
            initialEdges.push(edge)
        });
        console.log(initialEdges)
        setEdges(initialEdges)
    },[players])

    return<>
        <p>Players</p>
        <p></p>
        <div style={{height:"500px",width:"100vw"}}>
            <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}>
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    </>
}

export default PlayersInRoom