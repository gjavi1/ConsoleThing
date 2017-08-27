import Utils from '../console/Util';
import React from 'react';

export default class Ls {
	static match() {
		return "ls";
	}
	
	static do(command, env) {
		let commands = command.split(" ");
		const items = Utils.getItemsInDir();
		return {message: 
				<span> { 
					[items.map((val) => {
						return <div>
							<span className={`ls-${val.type}`} > {val.type === "string" ? val.name : `${val.name}/` } </span> <br/>
						</div>;
					})]
				}</span>
			};
	}

	static help() {
		return <span>ls - Outputs the contents of the current folder</span>;
	}
}
