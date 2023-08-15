import React, { useState, useEffect} from 'react'
import { Switch, Select, Tag, Modal } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import MenubarAdmin from '../../layouts/MenubarAdmin'
import { useSelector } from 'react-redux';
import moment from 'moment/min/moment-with-locales';

//function
import { listUser, 
    changeStatus, 
    changeRole,
    removeUser,
    resetPassword
    } from '../../functions/users';

const ManageAdmin = () => {
    const { user } = useSelector((state) => ({...state}))
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [values, setValues] = useState({
        id: "",
        password: "",
    });

    const showModal = (id) => {
        setIsModalOpen(true);
        setValues({...values, id: id})
    };
    
    const handleChangePassword = (e) => {
        setValues({...values, [e.target.name]: e.target.value });
    };

    const handleOk = () => {
        setIsModalOpen(false);
        resetPassword(user.token, values.id, { values })
        .then(res=> {
            console.log(res)
            loadData(user.token)
        }).catch(err => {
            console.log(err)
        })
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        //code
        loadData(user.token)
    },[]);

    const loadData = (authtoken) => {
        //code
        listUser(authtoken)
        .then(res => {
            //code
            setData(res.data);
        }).catch(err => {
            console.log(err.response.data);
        });
    };

    const handleOnChange = (e,id) => {
        const value = {
            id: id,
            enabled: e
        }
        changeStatus(user.token, value)
        .then(res=> {
            loadData(user.token);
        })
        .catch(err=> {
            console.log(err.response)
        });
    };

    const handleOnChangeRole = (e,id) => {
        let values = {
            id: id,
            role: e
        }
        changeRole(user.token, values)
        .then(res=> {
            loadData(user.token);
        }).catch(err=> {
            console.log(err.response)
        });
    };

    const handleRemove = (id) => {
        if(window.confirm("Are you sure to Delete?")){
            removeUser(user.token, id)
            .then(res=> {
                loadData(user.token);
            }).catch(err=> {
                console.log(err.response)
            });
        }
    };

    const roleData = ['admin', 'user']
    
  return (
    <div className='container-fluid'>
      <div className='row'>

          <div className='col-md-2'>
            <MenubarAdmin />
          </div>

          <div className='col'>
            <h1>ManageAdmin Page</h1>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Username</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created</th>
                    <th scope="col">Updated</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => 
                    <tr>
                        <th scope="row">{item.username}</th>
                        <td>
                            <Select 
                            style={{width:'100%'}}
                            value={item.role}
                            onChange={(e) => handleOnChangeRole(e, item._id)} >
                                {roleData.map((item, index) =>
                                <Select.Option value={item} key={index}>
                                    {item == 'admin' 
                                    ? <Tag color='green'>{item}</Tag>
                                    : <Tag color='red'>{item}</Tag> }
                                </Select.Option>
                                )}
                                
                            </Select>
                        </td>
                        <td>
                            <Switch checked={item.enabled} onChange={(e) => handleOnChange(e, item._id)} />
                        </td>
                        <td>
                            {moment(item.createdAt).locale('th').format('ll')}  
                        </td>
                        <td>
                            {moment(item.updatedAt).locale('th').startOf(item.updatedAt).fromNow()}
                        </td>
                        <td>
                            <DeleteOutlined onClick={() => handleRemove(item._id)}/>
                            <EditOutlined onClick={() => showModal(item._id)}/>
                        </td>
                    </tr>
                    )}
                    

                </tbody>
            </table>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>New Password :</p>
                <input onChange={handleChangePassword} type='text' name='password' />
            </Modal>
          </div>

      </div>
    </div>
  );
}

export default ManageAdmin;