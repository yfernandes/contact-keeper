import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
	ADD_CONTACT,
	GET_CONTACT,
	CLEAR_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACT,
	CLEAR_FILTER,
	CONTACT_ERROR,
} from "../types";

const ContactState = (props) => {
	const initialState = {
		contacts: null,
		current: null,
		filtered: null,
		error: null,
	};

	const [state, dispatch] = useReducer(contactReducer, initialState);

	const getContacts = async (cotact) => {
		try {
			const res = await axios.get("/api/contacts");
			dispatch({
				type: GET_CONTACT,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			});
			console.error(error.msg);
		}
	};

	// Add
	const addContact = async (contact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.post("/api/contacts", contact, config);
			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			});
			console.error(error.msg);
		}
	};
	// Delete
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/api/contacts/${id}`);
			dispatch({
				type: DELETE_CONTACT,
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			});
			console.error(error.msg);
		}
	};
	// Update
	const updateContact = async (contact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			const res = await axios.put(
				`/api/contacts/${contact._id}`,
				contact,
				config
			);
			dispatch({
				type: UPDATE_CONTACT,
				payload: res.data,
			});
		} catch (error) {
			dispatch({
				type: CONTACT_ERROR,
				payload: error.response.msg,
			});
			console.error(error.msg);
		}
	};
	const clearContact = () => {
		dispatch({
			type: CLEAR_CONTACT,
		});
	};
	// Set
	const setCurrent = (contact) => {
		dispatch({
			type: SET_CURRENT,
			payload: contact,
		});
	};
	// Clear
	const clearCurrent = () => {
		dispatch({
			type: CLEAR_CURRENT,
		});
	};

	// Filter
	const filterContact = (text) => {
		dispatch({
			type: FILTER_CONTACT,
			payload: text,
		});
	};
	// Clear Filter
	const clearFilter = () => {
		dispatch({
			type: CLEAR_FILTER,
		});
	};

	return (
		<ContactContext.Provider
			value={{
				contacts: state.contacts,
				current: state.current,
				filtered: state.filtered,
				error: state.error,
				addContact,
				getContacts,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContact,
				clearFilter,
				clearContact,
			}}>
			{props.children}
		</ContactContext.Provider>
	);
};

export default ContactState;
