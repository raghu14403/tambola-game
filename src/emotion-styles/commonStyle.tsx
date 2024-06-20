import styled from "@emotion/styled";

interface FlexBoxProps{
    display?:string|null;
    alignItems?:string|null,
    justifyContent?:string|null,
    gap?:string|null,
    flexDirection?:string|"row",
    background?:string|"";
}

interface BorderRadiusProps{
    borderTop?:string|"0";
    borderRight?:string|"0";
    borderBottom?:string|"0";
    borderLeft?:string|"0";
}

interface PositionProps{
    position?:"fixed"|"relative"|"static"|"absolute"|"sticky";
    top?:string;
    bottom?:string;
    left?:string;
    right?:string
}

interface TextProps{
    fontSize?:string;
    fontWeight?:string;
    fontStyle?:string;
}

export const Button=styled.div<BorderRadiusProps>`
    color:white;
    background:antiquewhite;
    width:45%;
    height:100px;
    border-top-left-radius:${props=>props.borderTop};
    border-top-right-radius:${props=>props.borderRight};
    border-bottom-left-radius:${props=>props.borderLeft};
    border-bottom-right-radius:${props=>props.borderBottom};
`

export const Box=styled.div<FlexBoxProps & PositionProps>`
    display:flex;
    align-items:${props=>props.alignItems};
    justify-content:${props=>props.justifyContent};
    gap:${props=>props.gap};
    flex-direction:${props=>props.flexDirection};
    background:${props=>props.background};
    position:${props=>props.position};
    top:${props=>props.top}
`

export const Text=styled.p<TextProps>`
    fontWeight:${props=>props.fontWeight};
    fontSize:${props=>props.fontSize};
`