import React from 'react'
import APIServices from '../APIServices/ApiServices'
import { useState, useEffect } from 'react'

const Form = (props) => {

const [title, setTitle] = useState(props.article.title)
const [body, setBody] = useState(props.article.body)

useEffect(() => {
    setTitle(props.article.title)
    setBody(props.article.body)
},[props.article])

const updateArticle = () => {
    if(props.article.id)
    {
        APIServices.UpdateArticle(props.article.id, { title, body })
            .then(resp => props.updatedData(resp))
            .catch(error => console.log(error))
    }
    else{
        APIServices.InsertArticle({ title, body })
            .then(resp => props.insertedData(resp))
            .catch(error => console.log(error))
    }
}

return (
    <div>
        {props.article ? (
            <form>
                <div className="mb-3">
                    <label htmlFor="newTitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="newTitle" 
                        placeholder="Enter New Title "
                        value= {title} 
                        onChange = {(e) => setTitle(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="description_new" className="form-label">Description</label>
                    <textarea type="body" className="form-control" id="description_new" 
                        placeholder="Enter New Description "
                        value={body} 
                        onChange = {(e) => setBody(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary"
                    onClick={updateArticle}>Submit</button>
            </form>
        ):null}
    </div>
  )
}

export default Form
