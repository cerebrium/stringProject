
import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { addItem, deleteItem } from './redux/actions';
import uuid from 'react-uuid'
import './app.scss'


const App = (props) => {
    // local state
    const [ inputText, setInputText ] = useState('')
    const [ wishlistArray, setWishlistArray ] = useState([])

    // error screen
    const [ errorScreen, setErrorScreen ] = useState(null)    

    // function for handling adding 
    const handleSubmit = (e) => {
        e.preventDefault()

        // check for types, only want strings
        if (typeof inputText !== typeof undefined && typeof inputText === typeof 'hello') {

            // if it is a string, we dont want the string to be a blank string
            if (inputText.length > 0) {
                // check the items to make sure we dont have a duplicate
                if (props.wishlist.wishList.length > 0) {
                    let canAddBool = true
                    props.wishlist.wishList.forEach( item => {
                        // seems the strings with the spaces in them are similiar enough I wanted to remove them to check for similarity
                        let localCheckString = item.message.replace(/\s/g, '').toLowerCase()
                        if (localCheckString === inputText.replace(/\s/g, '').toLowerCase()) {
                            canAddBool = false
                        }
                    })
                    if (canAddBool) {
                        props.addItem({
                            id: uuid(),
                            message: inputText
                        })
                    } else {
                        // handle string already found
                        setErrorScreen(
                            <div className='errorScreen'>
                                Santa already read that one, please ask for something else!
                            </div>
                        )
                        setTimeout( () => {
                            setErrorScreen(null)
                        }, 2000)
                    }
                // first time not needed to check    
                } else {
                    props.addItem({
                        id: uuid(),
                        message: inputText
                    })
                }
            } else {
                // handle nothing entered
                setErrorScreen(
                    <div className='errorScreen'>
                        Santa can't read your mind, please enter a longer request!
                    </div>
                )
                setTimeout( () => {
                    setErrorScreen(null)
                }, 2000)
            }
            setInputText('')
        }
    }

    // handle deleting messagesS
    const handleDeleteOne = (e, selectedMessage) => {
        props.deleteItem({
            id: selectedMessage.id
        })
    }

    // map the input to screen
    useEffect( () => {
        let localWishlistArray = []
        if (props.wishlist.wishList.length > 0) {
            props.wishlist.wishList.forEach( item => {
                localWishlistArray.push(
                    <h3 onClick={(e) => handleDeleteOne(e, item)} key={item.id}>{item.message}</h3>
                )
            })
        }
        setWishlistArray(localWishlistArray)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.wishlist])

    // function for setting text to state
    const handleInputChange = (e) => {
        setInputText(e.target.value)
    }

    // function for deleting all
    const handleDeleteAll = () => {
        if (wishlistArray.length > 0) {
            wishlistArray.forEach( ele => {
                props.deleteItem({
                    id: ele.key
                })
            })
            alert('Wish list submitted to Santa!')
        } else {
            // handle no items on list
            setErrorScreen(
                <div className='errorScreen'>
                    Santa needs at least one item to be able to pack his sleigh with!
                </div>
            )
            setTimeout( () => {
                setErrorScreen(null)
            }, 2000)
        }
    }

    return(
        <div className='appContainer'>
            <div className='mainBoxContainer'>
                <h2>MY WISHLIST</h2>
                <div className='displayBox'>
                    {wishlistArray}
                </div>
                {errorScreen}
                <form onSubmit={handleSubmit}>
                    <input type="text" value={inputText} onChange={handleInputChange}/>
                    <input type="submit" value="Add" className='addButton'/>
                </form>
                <button onClick={handleDeleteAll}>Submit</button>
            </div>
        </div>
    )
}

const mapDispatch = {
    addItem,
    deleteItem
}

const mapStateToProps = function(state) {
    return {
        wishlist: state
    }
}

export default connect(
    mapStateToProps,
    mapDispatch
)(App)