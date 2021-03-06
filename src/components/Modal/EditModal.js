import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const EditModal = ({ cancleModal, exporterId }) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("Default");

  const deleteExporter = () => {
    axios
      .delete(`http://10.153.5.73:8000/exporter?exporter_id=${exporterId}`)
      .then(res => {
        console.log(res.data.message);
        //성공을 알리는 모달
      })
      .catch(error => {
        console.log(error.response.data.message);
        //실패를 알리는 모달
      });
  };

  const selectCategory = e => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/data/categories.json").then(res => {
      setCategories(res.data.categories);
    });
  }, []);

  return (
    <ModalContainer>
      <Div>
        <img src="assets/image.png" />
        <Container>
          <select className="inputDiv" onChange={selectCategory}>
            <option>Select category</option>
            {categories.map(category => {
              return <option>{category.category_name}</option>;
            })}
          </select>
          <Button>
            <button className="inputDiv">Edit</button>
            <button className="inputDiv" onClick={deleteExporter}>
              Remove
            </button>
          </Button>
        </Container>
        <Back onClick={cancleModal}>
          <button>Back</button>
        </Back>
      </Div>
    </ModalContainer>
  );
};
const ModalContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Div = styled.div`
  width: 300px;
  height: 500px;
  background-color: white;
  ${({ theme }) => theme.positionCenter};
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-top: 50px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  margin-bottom: 50px;
  .inputDiv {
    width: 200px;
    height: 35px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.3);
    font-size: 12px;
    font-weight: 400;
    text-align: center;
    :hover {
      cursor: pointer;
    }
  }
`;
const Button = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  button {
    background-color: #efeeee;
    margin-bottom: 10px;
  }
`;
const Back = styled.div`
  width: 230px;
  height: 35px;
  margin-top: -20px;
  border-radius: 20px;
  background-color: #85dbc3;
  color: #ffffff;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  :hover {
    cursor: pointer;
  }
`;

export default EditModal;
