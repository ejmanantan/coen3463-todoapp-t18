import React, {PropTypes} from 'react';
import '../components/App.css';

import Loading from './loading';



const Todoitems=(props)=>{
    return (
                <li> <p style={{textDecoration:(props.item.isCompleted?'line-through':'none')}}>{props.item.name}
                <button className="button3" onClick={(e)=>{
                                        e.preventDefault()
                                        props.onComplete(props.item, props.index);
                                    }}>COMPLETED</button>
                <button className="button3" size="small"onClick={(e)=>{
                                        e.preventDefault()
                                        props.OnDelete(props.item, props.index);
                                    }}>DELETE</button>
                </p>
                </li>
    );
}
Todoitems.propTypes = {
    item: PropTypes.object.isRequired
    
}
export default Todoitems;
