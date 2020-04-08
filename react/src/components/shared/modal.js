import React, { useState } from 'react';

const Modal = ({
	handleClose,
	handleSubmit,
	show,
	header,
	children
}) => {
	const toggleDialogStyle = show ? { display: 'block' } : { display: 'none' };
	const toggleDialogClass = show ? 'modal fade show' : 'modal fade';

	return <div className={toggleDialogClass} style={toggleDialogStyle} role="dialog">
		<div className="modal-dialog">
			<div className="modal-content">
				<div className="modal-header">
					<h5 className="modal-title">{header}</h5>
					<button type="button" className="close" onClick={handleClose}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div className="modal-body">
					{children}
				</div>
				<div className="modal-footer">
					<button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
					<button type="button" className="btn btn-primary" onClick={handleSubmit}>Proceed</button>
				</div>
			</div>
		</div>
	</div>;
};

export default Modal;