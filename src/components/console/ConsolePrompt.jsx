import React, { Component } from 'react';

class ConsolePrompt extends Component {
    child = {
		cursor: [] || null
    };
    
    updateSemaphore = 0;

    componentDidMount() {
		this.idle();
    }

    componentDidUpdate() {
		this.idle();
    }
    
    idle() {
		// Blink cursor when idle
		if(this.child.cursor) {
			if(this.updateSemaphore === 0) {
				this.child.cursor.className = "console-cursor";
			}
			this.updateSemaphore++;
			window.setTimeout( () => {
				this.updateSemaphore--;
				if(this.updateSemaphore === 0 && this.child.cursor) {
					this.child.cursor.className = "console-cursor console-cursor-idle";
				}
			}, 1000);
		}
    }
    
    renderValue() {
		if(this.props.point < 0) {
			return [this.props.value];
		} else if (this.props.point === this.props.value.length) {
			return [this.props.value,<span ref={ref => this.child.cursor = ref} key="cursor" className="console-cursor">&nbsp;</span>];
		} else {
			return [this.props.value.substring(0,this.props.point),
				<span ref={ref => this.child.cursor = ref} key="cursor" className="console-cursor">{this.props.value}</span>,
				this.props.value.substring(this.props.point+1)];
		}
    }
    
    render() {
		let label = this.props.label;
		if(this.props.argument) {
			let idx = label.lastIndexOf("\n");
			if(idx >= 0) {
				label = label.substring(0, idx+1);
			} else {
				label = '';
			}
		}
		return <div className="console-prompt-box">
			<span className="console-prompt-label">{ label }</span>
			<span className="console-prompt-argument">{ this.props.argument }</span>
			<span className="console-prompt">{ this.renderValue() }</span>
		</div>;
    }
}

ConsolePrompt.defaultProps = {
    point: -1,
    value: "",
    label: "> ",
    argument: null,
}

export default ConsolePrompt;