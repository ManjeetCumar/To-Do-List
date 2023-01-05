import './App.css';
import {useState, useEffect} from 'react';
import Artlist from './components/list/artlist.jsx';
import Form from './components/form/form.jsx';

function App() {
  const [articles, setArticles] = useState([])
  const [editedArt, setEditedArticle] = useState(null) 

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/`,{
      'method': 'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [])

  const editArticle = (article) => {
    setEditedArticle(article)
  } 

  const updatedData = (article) => {
    const new_article = articles.map(my_article =>{
      if(my_article.id === article.id){
        return article
      }
      else {
        return my_article
      }
    })
    setArticles(new_article)
  }

  const openForm = () => {
    setEditedArticle({title:'',body:''})
  }

  const insertedData = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const deleteArticle = (article) => {
    const new_articles = articles.filter(my_article => {
      if(my_article.id === article.id){
        return false;
      }
      return true
    })
    setArticles(new_articles)
  }

  return (
    <div className="App">

      <div className='container'>
        <div className='header'>
          <h3>TO DO LIST </h3>
          <button type="button" className="btn btn-outline-info" onClick={openForm} >Add</button>
        </div>

        <div className='list'>
          <div className='form'>
            {editedArt ? <Form article={editedArt} updateData={updatedData} insertedData={insertedData} /> : null}
          </div>
          <Artlist articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />
        </div>

        

      </div>

    </div>
  );
}

export default App;
