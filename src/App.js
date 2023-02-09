import './App.css';
import { useState } from 'react';
function Nav(props){
  const lis = []
  for(let i=0; i<props.topics.length; i++){
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/'+t.id} onClick={(event)=>{
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}>{t.title}</a></li>)
  }
  return  <nav>
  <ol>
    {lis}
  </ol>
  </nav>
}
function Header(props){
  return <header>
  <h1><a href="/" onClick={(event)=>{
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}
function Content(props){
  return <content>
    <h1>{props.title}</h1>
    {props.body}
  </content>
}
function Create(props){
  return <content>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"></input></p>
      <p><textarea name="body" id="" cols="30" rows="10"></textarea></p>
      <p><input type="submit" value="Create"></input></p>
    </form>
  </content>
}
function App() {
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]);
  let content = null;
  if(mode === 'WELCOME'){
    content = <Content title="Welcome" body="Hello. WEB"></Content>
  } else if(mode === 'READ'){
    let title, body = null;
    for(let i=0; i<topics.length; i++){
      console.log(topics[i].id, id);
      if(topics[i].id === id){
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Content title={title} body={body}></Content>
  } else if(mode === 'CREATE'){
    content = <Create onCreate={(_title, _body)=>{
      const newTopic={id:nextId, title:_title, body:_body}
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopics(newTopics);
    }}></Create>
  }
  return (
    <div>
     <Header title="WEB" onChangeMode={()=>{
      setMode('WELCOME');
     }}></Header>
     <Nav topics={topics} onChangeMode={(_id)=>{
      setMode('READ');
      setId(_id);
     }}></Nav>
     {content}
     <br></br>
     <a href="/create" onClick={event =>{
      event.preventDefault();
      setMode('CREATE');
     }}>Create</a>
    </div>
  );
}

export default App;
