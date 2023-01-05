import React from 'react'
import APIServices from '../APIServices/ApiServices'

const artlist = (props) => {


  const editNote = (note) => {
    props.editArticle(note)
  }

  const deleteArticle = (article) => {
    APIServices.DeleteArticle(article.id)
    .then(() => props.deleteArticle(article))
  }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">SNo</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {props.articles.map((article, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{article.title}</td>
              <td>{article.body}</td>
              <td>{article.date}</td>
              <td>
                <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                  <button className="btn btn-primary me-md-2" type="button" onClick={() => editNote(article)}>Update</button>
                  <button className="btn btn-danger"
                    type="button"
                    onClick={() => deleteArticle(article)}
                  >Delete</button>
                </div>
              </td>
            </tr>
        ))}        
        </tbody>  
      </table>

    </div>
  )
}

export default artlist
