import React from 'react';
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { Button } from "react-bootstrap";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import * as XLSX from 'xlsx';


const StudentTable = ({
  list,
  colNames,
  userDetails,
  editData,
  handleEdit,
  editOnChange,
  editFormSumbit,
  handleDelete,
  modalType,
  addData,
  addOnChange,
  addFormSumbit,
}) => {

  return (
    <div className='container-fluid'>
      <Modal
        colNames={colNames}
        editDetails={editData}
        editOnChange={editOnChange}
        editFormSumbit={editFormSumbit}
        modalType={modalType}
        addDetails={addData}
        addOnChange={addOnChange}
        addFormSumbit={addFormSumbit}
      />

      <div className='d-flex justify-content-end' style={{marginBottom: "30px"}}>
      <Button
          variant="default"
          style={{ color: "white", background: "#87CEFA" }}
      > 
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button"
        table="table-to-xls"
        filename="test"
        sheet="tablexls"
        buttonText="Download XL"
      />
      </Button>

      &nbsp;&nbsp;

      <Button variant="default"
              style={{ color: "white", background: "#87CEFA" }}
              onClick={() => {
                document.getElementById('realfile').click();              
              }}
      >
      <input type="file" id="realfile" hidden="hidden"/>
      <button type="button" id="custom-button">Upload XL</button>
      </Button>
      </div>

      <div className='d-flex justify-content-center'>
        {list.length > 0 && (
          <table className='table table-striped table-hover w-100 text-center' id="table-to-xls">
            <thead style={{ backgroundColor: '#87CEFA' }}>
              <tr>
                {colNames.map((colName, index) => (
                  <th key={index}>{colName.toUpperCase()}</th>
                ))}
                <th key='999'>View Profile</th>
                <th key='1000'>Insert / Delete</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(list).map((student, index) => (
                <tr key={index} style={{ borderBottom: '1px solid gray' }}>
                  {Object.values(student).map((val, index2) => (
                    <td key={index2}>{val}</td>
                  ))}
                  <td key='999'>
                    <Link to={`/student/${student.id}`}>
                      <button
                        className='border-0 bg-transparent'
                        onClick={() => {
                          userDetails(student);
                        }}
                      >
                        View
                      </button>
                    </Link>
                  </td>
                  <td key='1000'>
                    <button
                      className='border-0 bg-transparent'
                      data-bs-toggle='modal'
                      data-bs-target='#staticBackdrop'
                      onClick={(e) => {
                        handleEdit(e, student);
                      }}
                    >
                      <i className='bi bi-pencil-square'></i>
                    </button>{' '}
                    |{' '}
                    <button
                      className='border-0 bg-transparent'
                      onClick={(e) => handleDelete(e, student)}
                    >
                      <i className='bi bi-trash-fill'></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StudentTable;