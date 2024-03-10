import React, { useEffect } from 'react';
import axios from 'axios'
import Cookies from 'universal-cookie';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';


import './Home.css'

const HomeComponent = () => {
    const [title, setTitle] = React.useState('');
    const [priority, setPriority] = React.useState('');
    const [startHour, setStartHour] = React.useState('');
    const [startMin, setStartMin] = React.useState('');
    const [endHour, setEndHour] = React.useState('');
    const [endMin, setEndMin] = React.useState('');
    const [isUpdate, setIsUpdate] = React.useState(false);
    const [dayName, setDayName] = React.useState('');
    const [id, setId] = React.useState('');
    const [weekDays, setWeekDays] = React.useState([
        {
            _id: 'sunday'
        },
        { _id: 'monday' },
        { _id: 'tuesday' },
        { _id: 'wednesday' },
        { _id: 'thursday' },
        { _id: 'friday' },
        { _id: 'saturday' },
    ]);
    const [show, setShow] = React.useState(false);
    const cookies = new Cookies();

    const handleClose = () => {
        setIsUpdate(false)
        setShow(false)
    };
    const handleShow = () => {
        setTitle('')
        setStartHour('')
        setStartMin('')
        setEndHour('')
        setEndMin('')

        setPriority('')
        setDayName('')
        setId('')
        setShow(true)
    };

        useEffect(() => {
            async function fetchData() {
                const token = cookies.get('token')
                console.log(token, 'token')
                if (!token) window.location.href = '/login';
                const response = await axios.get('https://routine-generator-backend.onrender.com/schedule', {
                    headers: {
                        'Authorization': `bearer ${token}`
                    }
                })
                if (response.data.status) {
                    const schedules = response.data.data
                    for (const schedule of schedules) {
                        const index = weekDays.findIndex(item => item._id === schedule._id)
                        if (index >= 0) {
                            weekDays[index] = schedule
                        }
                    }
                    setWeekDays(weekDays)
                }
                console.log(weekDays, 'weekDays')
            }
            fetchData()
        }, [])


    const handleScheduleTitle = (e) => {
        setTitle(e.target.value)
        console.log(title, 'title')
    }
    const handleSchedulePriority = (e) => {
        setPriority(e.target.value)
        console.log(priority, 'priority')
    }
    const handleScheduleStartHour = (e) => {
        setStartHour(e.target.value)
        console.log(startHour, 'priority')
    }
    const handleScheduleStartMin = (e) => {
        setStartMin(e.target.value)
        console.log(startMin, 'startMin')
    }
    const handleScheduleEndHour = (e) => {
        setEndHour(e.target.value)
        console.log(endHour, 'endHour')
    }
    const handleScheduleEndtMin = (e) => {
        setEndMin(e.target.value)
        console.log(endMin, 'endMin')
    }


    const handleCreate = async (event) => {
        const token = cookies.get('token')
        console.log(token, 'token')
        if (!token) window.location.href = '/login';
        event.preventDefault()
        const response = await axios.post('https://routine-generator-backend.onrender.com/schedule/create', {
            title,
            start_time: startHour + ':' + startMin,
            end_time: endHour + ':' + endMin,
            priority,
            dayName
        }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        handleClose()
    }

    const handleUpdatModal = (data) => {
        setIsUpdate(true)
        setTitle(data.title)

        const splitStartTime = data.start_time.split(':')
        setStartHour(splitStartTime[0])
        setStartMin(splitStartTime[1])

        const splitEndTime = data.end_time.split(':')
        setEndHour(splitEndTime[0])
        setEndMin(splitEndTime[1])

        setPriority(data.priority)
        setDayName(data.dayName)
        setId(data._id)

        setShow(true);
        console.log('work', title, priority, dayName, id)
    }

    const handleUpdate = async (event) => {
        const token = cookies.get('token')
        console.log(token, 'token')
        if (!token) window.location.href = '/login';
        event.preventDefault()
        const response = await axios.post('https://routine-generator-backend.onrender.com/schedule/update', {
            title,
            start_time: startHour + ':' + startMin,
            end_time: endHour + ':' + endMin,
            priority,
            dayName,
            id
        }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })

        console.log(response, 'responsegot')

        setIsUpdate(false)
        handleClose()
    }

    const handleDelete = async (event) => {
        const token = cookies.get('token')
        console.log(token, 'token')
        if (!token) window.location.href = '/login';
        event.preventDefault()
        const response = await axios.post('https://routine-generator-backend.onrender.com/schedule/delete', {
            id
        }, {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })

        console.log(response, 'responsegot')

        setIsUpdate(false)
        handleClose()
    }
    const handleLogout = async (event) => {
        const token = cookies.get('token')
        console.log(token, 'token')
        if (!token) window.location.href = '/login';
        event.preventDefault()
        const response = await axios.post('https://routine-generator-backend.onrender.com/student/logout', {
            headers: {
                'Authorization': `bearer ${token}`
            }
        })
        
        console.log(response, 'responsegot')
        cookies.set('token', '')
        window.location.href = '/login';


        setIsUpdate(false)
        handleClose()
    }

    return (
        <div className='home'>
            <h1>Hey, Do work on time!</h1>
            <div className='parent_div'>
                <div className='schedules'>
                    {weekDays.map(weekDay => <div className='single_schedule'>
                        <h1 className='weekDay_title'>{weekDay._id.toUpperCase()}</h1>
                        <div className='events'>
                            {weekDay?.data?.map(singleData => <div className='event'>
                                <h6 onClick={() => handleUpdatModal(singleData)}>{singleData.title}</h6>
                                <p>{singleData.start_time} - {singleData.end_time}</p>
                            </div>)}
                        </div>
                    </div>)}
                </div>
                <div className='add_schedule'>
                    <>
                        <Button className='schedule_btn' variant="primary" onClick={handleShow}>
                            Add schedule
                        </Button>
                        <br/>
                        <Button className='schedule_btn signout' variant="primary" onClick={handleLogout}>
                            Logout
                        </Button>

                        <Modal className='modal' show={show} onHide={handleClose}>
                            <Modal.Title>Add Your schedule</Modal.Title>

                            <div>
                                <input value={title} onChange={handleScheduleTitle} placeholder='Title' className='title' type='text' />
                                <div>
                                    <label>Start time</label>
                                    <input value={startHour} onChange={handleScheduleStartHour} placeholder='Hour' className='time' type='text' />
                                    <input value={startMin} onChange={handleScheduleStartMin} placeholder='Min' className='time' type='text' />
                                </div>
                                <div>
                                    <label>End time</label>
                                    <input value={endHour} onChange={handleScheduleEndHour} placeholder='Hour' className='time' type='text' />
                                    <input value={endMin} onChange={handleScheduleEndtMin} placeholder='Min' className='time' type='text' />
                                </div>
                                <input value={priority} onChange={handleSchedulePriority} placeholder='Priority (1 - 5)' className='title' type='number' />
                                <input onChange={() => setDayName("sunday")} type="radio" id="sun" name="fav_language" value="sunday" />
                                <label onChange={() => setDayName("sunday")} className='radios' for="sun">Sun</label>
                                <input onChange={() => setDayName("monday")} type="radio" id="mon" name="fav_language" value="monday" />
                                <label onChange={() => setDayName("monday")} for="mon">Mon</label>
                                <input onChange={() => setDayName("tuesday")} type="radio" id="tue" name="fav_language" value="tuesday" />
                                <label onChange={() => setDayName("tuesday")} className='radios' for="tue">Tue</label>
                                <input onChange={() => setDayName("wednesday")} type="radio" id="wed" name="fav_language" value="wednesday" />
                                <label onChange={() => setDayName("wednesday")} className='radios' for="wed">Wed</label>
                                <input onChange={() => setDayName("thursday")} type="radio" id="thu" name="fav_language" value="thursday" />
                                <label onChange={() => setDayName("thursday")} className='radios' for="thu">Thu</label>
                                <input onChange={() => setDayName("friday")} type="radio" id="fri" name="fav_language" value="friday" />
                                <label onChange={() => setDayName("friday")} className='radios' for="fri">Fri</label>
                                <input onChange={() => setDayName("saturday")} type="radio" id="sat" name="fav_language" value="saturday" />
                                <label onChange={() => setDayName("saturday")} className='radios' for="sat">Sat</label>
                            </div>

                            <Modal.Footer>
                                <Button className='modal_btn' variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                                {isUpdate ? <Button className='modal_btn' variant="primary" onClick={handleUpdate}>
                                    Update
                                </Button> : <Button className='modal_btn' variant="primary" onClick={handleCreate}>
                                    Create
                                </Button>}
                                {isUpdate && <Button className='modal_btn' variant="primary" onClick={handleDelete}>
                                    Delete
                                </Button>}

                            </Modal.Footer>
                        </Modal>
                    </>

                </div>
            </div>
        </div>
    );
};

export default HomeComponent;