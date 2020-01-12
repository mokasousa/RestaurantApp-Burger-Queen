import React, { useState, useEffect } from 'react';
import firebase from '../../config/firebase.js';
import MenuOrderList from '../../Components/MenuOrderList';
import MenuOrder from '../../Components/MenuOrder';
import MenuForm from '../../Components/MenuForm';
import './styles.css';

const styleClientOrder = {
    backgroundColor: 'rgba(192, 171, 149, 0.3)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // width:'100%',
    flexGrow:1,
    borderRadius: '2px',
    maxWidth: '621px',
    bottom: 0, 
    margin:'0 auto',
    height: 'min-content'
}

const styleMenuPage = {
    display:'flex',
    flexWrap:'nowrap'
}

const Menu = () => {
    const [menu, setMenu] = useState([]);
    const [order, setOrder] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        firebase
            .firestore()
            .collection('Menu')
            .get()
            .then((response) => {
                const itensMenu = [];
                response.forEach(item => itensMenu.push(item.data()))
                setMenu(itensMenu.sort((a,b) => a.name > b.name));
            })
    }, [])
 
    return(
        <>   
            <div className='menu-page' style={styleMenuPage}>
            <div style={{flexGrow:15}}>
            <MenuOrder menu={menu} order={order} setOrder={setOrder} setTotal={setTotal}/>
            </div>
            <div className='client-order' style={styleClientOrder}>
            <MenuOrderList order={order} setOrder={setOrder} total={total} setTotal={setTotal}/>
            <MenuForm order={order} setOrder={setOrder} total={total} setTotal={setTotal} />
            </div>
            </div>
        </>
    )
}

export default Menu