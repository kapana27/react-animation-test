import {createRef, useEffect, useState} from "react"
import {CSSTransition, TransitionGroup} from "react-transition-group"
import _ from "lodash"

const second =  [
    {
        id: 0,
        username:"test0",
        text: 'Buy eggs',
        points:100,
    },
    {
        id: 1,
        username:"test1",
        text: 'Pay bills',
        points:200,
    },
    {
        id: 2,
        username:"test2",
        text: 'Invite friends over',
        points:119,

    },
    {
        id: 3,
        username:"test3",
        text: 'Fix the TV',
        points:250,
    },
]

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



  return (
      <div>
          <button
              style={{
                  marginLeft:20,
                  marginTop:20
              }}

              onClick={() => {
                   let tmp = items;
                    tmp[0]["rank"]=2;
                    tmp[0]["active"]="active";

                    tmp[1]["rank"]=1;
                    tmp[1]["active"]="active";
                    console.log(tmp)
                    setItems([...tmp])



                  setTimeout(()=>{
                      tmp[0]["active"]="";
                      tmp[1]["active"]="";
                      setItems([...tmp])
                  },500)
              }}
          >
              Add Item
          </button>
          <div className="container">


              <TransitionGroup className="todo-list">
                  {items.map(({ id, text,username, nodeRef ,rank,active=""}) => (
                      <CSSTransition
                          key={username}
                          timeout={500}
                          classNames={`item `}
                          nodeRef={nodeRef}
                      >
                          <div className={`item ${active}`} style={{top: `${(rank-1) * 80}px`}} ref={nodeRef}>
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
                              {text}
                          </div>
                      </CSSTransition>
                  ))}
              </TransitionGroup>

          </div>
      </div>

  );
}

export default App;
