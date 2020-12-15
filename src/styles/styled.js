import styled from 'styled-components';
import React from 'react';

// Buttons
function Button({ className, children, ...props }) {
	return (
		<button className={className} {...props}>
			{children}
		</button>
	);
}

export const BtnDefault = styled(Button)`
	min-height: 50px;
	min-width: 100px;
    margin-top: 20px;
    margin-left: 20px;
	margin-bottom: 20px;
	color: #fff;
	border: none;
	border-radius: 5px;
	font-family: 'Roboto', sans-serif;
	font-size: 15px;
	text-transform: uppercase;
	letter-spacing: 2.5px;
	font-weight: 500;
	background: linear-gradient(70deg, #fff, #000);
	border-bottom: 5px solid #c44267;
	outline: none;
	cursor: pointer;
	box-shadow: inset 0 0 0 0 #ededed;
	-webkit-transition: ease-out 0.5s;
	-moz-transition: ease-out 0.5s;
	transition: ease-out 0.5s;
	&:hover {
		box-shadow: inset 400px 0 0 0 #ededed;
	}
`;

export const BtnRed = styled(BtnDefault)`
	background: linear-gradient(70deg, #fc030f, #de5057);
	border-bottom: 5px solid #800020;
`;

export const BtnNoneOutLine = styled.button`
    margin-top: 20px;
    margin-bottom: 30px;
    justify-content: center;
	width: 140px;
	height: 45px;
	font-family: 'Roboto', sans-serif;
	font-size: 11px;
	text-transform: uppercase;
	letter-spacing: 2.5px;
	font-weight: 500;
	color: #000;
	background-color: #fff;
	border: none;
	border-radius: 45px;
	box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease 0s;
	cursor: pointer;
	outline: none;
	&:hover {
		background-color: #f55f5f;
		box-shadow: 0px 15px 20px #f7bcbc;
		color: #fff;
		transform: translateY(-7px);
	}
`;

export const Header = styled.div`
	margin-top: 10px;
    margin-bottom: 40px;
    justify: center;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-weight: lighter;
	color: #bdb5b5;
	font-family: 'Roboto', sans-serif;
	font-size: 40px;
	text-transform: uppercase;
    letter-spacing: 2.5px;
    text-align: center;
`;
