import React, {useState, useEffect, useCallback} from 'react';
import Toolbar from './Toolbar';
// import Cards from './Cards';
import axios from 'axios';
import './MyStyle.css';
import { BiBowlHot, BiBowlRice, BiCookie } from "react-icons/bi";
import ReactPlayer from 'react-player/youtube'

function Category() {
  const [dataFetching, setDataFetching] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [dataSelected, setDataSelected] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [category, setCategory] = useState('')
  
  const filterFood = useCallback(
    (e) => {
      const fData = async() => {
        try {
          const resp = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?c='+e.target.textContent )
          setDataFiltered(resp.data.meals)
          setCategory(e.target.textContent)
        } catch (err) {
          console.log(err.message)
        }
      }
      fData()
    },
    [],
  )

const detailSelectedData = useCallback(
  (e) => {
    console.log(e.target.id)
    const dsData = async () => {
      try {
        const respDt = await axios.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i='+e.target.id)
        setDataSelected(respDt.data.meals)
        console.log(respDt.data.meals)

        setIngredients(Object.values(
          Object.keys(respDt.data.meals[0])
          .filter((key) => key.includes('strIngredient') && respDt.data.meals[0][key] !== '')
          .filter((key) => respDt.data.meals[0][key] !== null && respDt.data.meals[0][key] !== ' ')
          .reduce((obj,key) => {
            return Object.assign(obj, {
              [key]: respDt.data.meals[0][key]
            })
          }, {})
          )
        )

        setMeasure(Object.values(
          Object.keys(respDt.data.meals[0])
          .filter((key) => key.includes('strMeasure') && respDt.data.meals[0][key] !== '')
          .filter((key) => respDt.data.meals[0][key] !== null && respDt.data.meals[0][key] !== ' ')
          .reduce((obj,key) => {
            return Object.assign(obj, {
              [key]: respDt.data.meals[0][key]
            })
          }, {})
          )
        )
      } catch (err){
        console.log(err.message)
      }
    }
    dsData()
  },
  [],
)


  const homeContentContainer = document.getElementsByClassName('hContent')
  const fdContentContainer = document.getElementsByClassName('fdContent')
  const iContentContainer = document.getElementsByClassName('iContent')

  const hide = (item) => {
    for (let i = 0; i < item.length; i++) {
      if (!item[i].classList.contains('none')) {
          item[i].classList.add('none')
        }
    }
  }
  
  const unhide = (item)=> {
    for (let i = 0; i < item.length; i++) {
      if (item[i].classList.contains('none')) {
          item[i].classList.remove('none')
        }
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
        setDataFetching(res.data.categories)
        // console.log(dataFetching)
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchData()
  }, [dataFetching])
  
  return (
    <div>
        <Toolbar
          homeContentContainer = {homeContentContainer}
          fdContentContainer = {fdContentContainer}
          iContentContainer = {iContentContainer}
          unhide = {unhide}
        />

        <div className='d-flex flex-column justify-content-center homeContent' id='home'>
          <div className='mb-5 mt-5 hContent'>
            <div className='mb-2 iconContainer hContent'>
              <BiBowlHot style={{width: '25px', color: 'salmon'}} className='hContent'/>
              <BiBowlRice style={{width: '25px', color: 'salmon'}} className='hContent'/>
              <BiCookie style={{width: '25px', color: 'salmon'}} className='hContent'/>
            </div>
            <h6 className='hContent'>mealapp API website</h6>
            <h1 className='hContent'>See All The Delicious Foods</h1>
          </div>

          <div className="row d-flex flex-wrap gap-3 align-self-center mb-5 picContainer hContent" id='ingredients'>
              {dataFetching && dataFetching.map(data => {
                  return (
                      <div key={data.idCategory} className="card position-relative cardStyle hContent" onClick={(e) => {filterFood(e); hide(homeContentContainer); unhide(fdContentContainer); hide(iContentContainer)}}>
                          <img src={data.strCategoryThumb} className="pic hContent" alt={data.strCategory}/>
                          <h5 className='position-absolute top-50 start-50 translate-middle title hContent'>{data.strCategory}</h5>
                      </div>
                  )
              })
              }
          </div>
          
          <div className="row d-flex flex-wrap gap-3 align-self-center mb-5 picContainer fdContent" id='foods'>
              {category !== '' && 
              <div>
                <nav aria-label="breadcrumb fdContent">
                  <ol className="breadcrumb fdContent">
                    <li className="breadcrumb-item fdContent"><a href="home" onClick={(e)=> {e.preventDefault(); unhide(homeContentContainer); hide(fdContentContainer); hide(iContentContainer)}}>Home</a></li>
                    <li className="breadcrumb-item active fdContent" aria-current="page">foods</li>
                  </ol>
                </nav>
                <h2 className='text-start fdContent'>{category}</h2>
              </div>
              }
              {dataFiltered && dataFiltered.map(data => {
                  return (
                      <div key={data.idMeal} className="card position-relative cardStyle fdContent" onClick={(e) => {detailSelectedData(e); hide(homeContentContainer); hide(fdContentContainer); unhide(iContentContainer)}}>
                          <img src={data.strMealThumb} className="pic fdContent" alt={data.strMeal}/>
                          <h5 id={data.idMeal} className='position-absolute top-50 start-50 translate-middle title fdContent'>{data.strMeal}</h5>
                      </div>
                  )
              })
              }
          </div>
        </div>

        {dataSelected.length !== 0
        ?
        <div className='detailContainer col-md-10 offset-1 iContent'>
          <nav aria-label="breadcrumb iContent">
            <ol className="breadcrumb iContent">
              <li className="breadcrumb-item iContent"><a href="home" onClick={(e)=> {e.preventDefault(); unhide(homeContentContainer); hide(fdContentContainer); hide(iContentContainer)}}>Home</a></li>
              <li className="breadcrumb-item iContent"><a href="a1" onClick={(e)=> {e.preventDefault(); hide(homeContentContainer); unhide(fdContentContainer); hide(iContentContainer)}}>foods</a></li>
              <li className="breadcrumb-item active iContent" aria-current="page">ingredients</li>
            </ol>
          </nav>

          <h2 className='mb-5 iContent'>{dataSelected[0].strMeal}</h2>
          <h5 className='iContent' style={{color: 'salmon'}} id='localCulinary'>{dataSelected[0].strArea} Culinary</h5>
          <div className='row'>
            <div className='col-md-6 col-sm-10 iContent'>
              <img src={dataSelected[0].strMealThumb} className="img-fluid mb-3 pic iContent" alt={dataSelected[0].strMeal}/>
            </div>
            <div className='col-md-6 col-sm-10 iContent'>
              <div>
                <h4 className='iContent'>Instructions</h4>
                <p className='iContent'>{dataSelected[0].strInstructions}</p>
              </div>
              <div>
                <h4 className='iContent'>Recipes</h4>
                <ul>
                  {measure.map((data, i) => {
                    return (
                     <li key={i} className='iContent'>{data} {`${ingredients[i]}`}</li>
                    )
                  })}
                </ul>
              </div>

            </div>
          </div>
          {dataSelected[0].strYoutube !== '' 
          ? 
          <div>
            <h4 className='text-center mt-4 iContent'>Tutorials</h4>
            <div className='iContent'>
              <ReactPlayer url={dataSelected[0].strYoutube} width={'100%'} className='vStyle iContent'/>
            </div>
          </div>
          : null 
          }

        </div>
        : null
      }
    </div>
  )
}

export default Category