import React, { useState , useEffect} from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import EmployeeService from "../service/EmployeeService";


const AddEmployeeComponent = () => {

    const [ firstName, setFirstName ] = useState( '' );
    const [ lastName, setLastName ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const navigate = useNavigate();
    const { id } = useParams();
    

    const employeeData = { firstName, lastName, email };

    function saveEmployee ( e ) {
        e.preventDefault();
        if ( employeeData.firstName !== "" && employeeData.lastName !== "" && employeeData.email !== "" ) {
            if (id) {
                EmployeeService.updateEmployee( id, employeeData )
                    .then( navigate( "/employee" ) )
                    .catch( e => console.log( e ) );
            } else {
                EmployeeService.saveEmployee( employeeData )
                    .then( navigate( "/employee" ) )
                    .catch( e => console.log( e ) );
            }
        } else {
            alert( "Please provide required information." );
        }
        
    }

    function tile ( ) {
        if ( id ) {
            return "Update Employee";
        } else {
            return "Add Employee";
        }
    }

    useEffect( () => {
        if ( id ) {
            EmployeeService.getEmployeeById( id )
                .then( res => {
                    setFirstName( res.data.firstName );
                    setLastName( res.data.lastName );
                    setEmail( res.data.email );
                })
                .catch( e => console.log( e ) );
        }
    }, [] );


    return (
        <div>
            <div className="container mt-5">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h2 className="text-center">{tile()}</h2>
                        <div className="card-body">
                            <form>
                                <div className="form-group mb-2">
                                    <input className="form-control"
                                        value={firstName}
                                        onChange={(e)=>setFirstName(e.target.value)}
                                        type="text" placeholder="Enter First Name" />
                                </div>
                                <div className="form-group mb-2">
                                    <input className="form-control"
                                        value={lastName}
                                        onChange={(e)=>setLastName(e.target.value)}
                                        type="text" placeholder="Enter Last Name" />
                                </div>
                                <div className="form-group mb-2">
                                    <input className="form-control"
                                        value={email}
                                        onChange={(e)=>setEmail(e.target.value)}
                                        type="email" placeholder="Enter Email" />
                                </div>
                                <button onClick={(e)=>saveEmployee(e)} className="btn btn-success ml-3 mr-3">Save</button> 
                                <Link to={"/employee"} className="btn btn-danger" href="">Cancel</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;