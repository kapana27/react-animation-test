import {createRef, useEffect, useState} from "react"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import _ from "lodash"
import Counter from "./Counter"

const second =  [
    {
        id: 0,
        username:"test0",
        text: 'Buy eggs',
        points:201,
        active:"",
        rank:5
    },
    {
        id: 1,
        username:"test1",
        text: 'Pay bills',
        points:200,
        status:""
    },
    {
        id: 2,
        username:"test2",
        text: 'Invite friends over',
        points:119,
        status:""
    },
    {
        id: 3,
        username:"test3",
        text: 'Fix the TV',
        points:250,
        status:""
    },
    {
        id: 4,
        username:"test4",
        text: 'Fix the TV',
        points:0,
        status:""
    },
]
let difference = [];

function App() {

  const [items, setItems] = useState(() => [
    {
      id: 0,
      username:"test0",
      text: 'Buy eggs',
      points:200,
      rank:1,
      nodeRef: createRef(),
      active:""
    },
    {
      id: 1,
        username:"test1",
      text: 'Pay bills',
      points:150,
      rank:2,
      nodeRef: createRef(),
        active:""
    },
    {
      id: 2,
      username:"test2",
         text: 'Invite friends over',
        points:100,
        rank:3,
        nodeRef: createRef(),
        active:""

    },
    {
      id: 3,
       username:"test3",
       text: 'Fix the TV',
        points:50,
        rank:4,
        nodeRef: createRef(),
        active:""
    },
  ]);

    useEffect(() => {
        setTimeout(()=>{
            rerender()
            setTimeout(()=>rerender(),1000)
        },2000)

    }, []);

     const rerender=()=>{
         let tmp = items;

         let index = 0;
         _.forEach(_.orderBy(second,['points'],["desc"]), (value)=>{
             let findIndex =_.findIndex(tmp,v=>v.username ===value.username)
             if(findIndex===-1){
                 let tmpValue = {...value}
                 tmpValue["rank"]=index+1;
                 tmpValue["nodeRef"]=createRef();
                 tmpValue["active"] = "animate";
                 tmpValue["points"] = value["points"];
                 tmp = [...tmp,tmpValue]
             }else{
                 tmp[findIndex]["active"] =tmp[findIndex]["rank"] === index+1? '': tmp[findIndex]["rank"] > index+1 ?'active top':'active bottom'
                 tmp[findIndex]["rank"]=index+1;
                 tmp[findIndex]["points"]=value["points"];
             }
             index++;
         })
         setItems([...tmp])

     }

  return (
      <div>
          <button
              style={{
                  marginLeft:20,
                  marginTop:20
              }}

              onClick={() => {
                  rerender()
              }}
          >
              Add Item
          </button>
          <div className="container">

              <TransitionGroup >
                  {items.map(({ id, text,username, nodeRef ,rank,active="",points=0}) => (
                      <CSSTransition
                          key={username}
                          timeout={500}
                          classNames={`item `}
                          nodeRef={nodeRef}
                      >
                          <div className={`item ${active} ${username==='test3'? 'me':''}`} style={{top: `${(rank-1) * 80}px`}} ref={nodeRef}>
                              <button
                                  className="remove-btn"
                                  onClick={() =>
                                      setItems((items) =>
                                          items.filter((item) => item.id !== id)
                                      )
                                  }
                              >
                                  &times;
                              </button>
                              {text}  <Counter number={points} duration={0.2}/>
                          </div>
                      </CSSTransition>
                  ))}
              </TransitionGroup>

          </div>
      </div>

  );
}

export default App;
