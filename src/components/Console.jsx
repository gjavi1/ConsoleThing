import React, { Component } from 'react';
import ConsolePrompt from './console/ConsolePrompt';
import ConsoleMessage from './console/ConsoleMessage';
import Exit from './commands/Exit.jsx';
import Clear from './commands/Clear.jsx';

let commands = [Exit, Clear];

// Use ConsoleCommand and SearchDirection as ENUM
export const ConsoleCommand = {
	Default: 0,
	Search: 1,
	Kill: 2
};

export const SearchDirection = {
	Reverse: 0,
	Forward: 1
};

class Console extends Component {
    constructor(props) {
		super(props);
		this.state = {
			focus: false,
			acceptInput: true,
			typer: '',
			point: 0,
			currLabel: this.nextLabel(),
			promptText: '',
			restoreText: '',
			searchText: '',
			searchDirection: null,
			searchInit: false,
			log: [],
			history: [],
			historyn: 0,
			kill: [],
			argument: null,
			lastCommand: ConsoleCommand.Default,
		};
    }
	
    child = {
		typer: [] || null,
		container: [] || null,
		focus: [] || null
    };
    
    log = (messages) => {
		let log = this.state.log;
		log[this.state.log.length-1].message = messages;
		this.setState({
			log: log,
		}, this.scrollIfBottom() );
	}
	
	return = () => {
		this.setState({
			acceptInput: true,
			currLabel: this.nextLabel(),
		}, this.scrollIfBottom() );
    }
    
    // Component Lifecycle
	componentDidMount() {
		if(this.props.autofocus) {
			this.focus();
		}
	}

	// Event Handlers
	focus = () => {
		if(!window.getSelection().toString()) {
			this.child.typer.focus();
			this.setState({ focus: true }, this.scrollToBottom );
		}
	}

	blur = () => {
		this.setState({ focus: false });
    }
    
	keyDown = (e) => {
		const keyCodes = {
			13: this.acceptLine,
			37: this.backwardChar,
			39: this.forwardChar,
			38: this.previousHistory,
			40: this.nextHistory,
			8:  this.backwardDeleteChar,
			46: this.deleteChar,
			35: this.endOfLine,
			36: this.beginningOfLine,
			9: this.complete
		};
		const ctrlCodes = {
			65: this.beginningOfLine,
			69: this.endOfLine,
			70: this.forwardChar,
			66: this.backwardChar,
			80: this.previousHistory,
			78: this.nextHistory,
			82: this.reverseSearchHistory,
			83: this.forwardSearchHistory,
			68: this.deleteChar,
			75: this.killLine,
			67: this.cancelCommand
		};
		
		if(this.state.acceptInput) {
			if (e.ctrlKey) {
				console.log(e.keyCode);

				if (e.keyCode in ctrlCodes) {
					ctrlCodes[e.keyCode]();
					e.preventDefault();
				} 

				if (e.keyCode !== 86) {
					e.preventDefault();
				}
			} else if (e.keyCode in keyCodes) {
				keyCodes[e.keyCode]();
				e.preventDefault();
			}
		}
	}

	componentWillUpdate() {
		console.log(this.state.log);
	}
	change = () => {
		let idx = 0;
		for(;idx < this.state.typer.length && idx < this.child.typer.value.length; idx++) {
			if(this.state.typer[idx] !== this.child.typer.value[idx]) {
				break;
			}
		}
		let insert = this.child.typer.value.substring(idx);
		let replace = this.state.typer.length - idx;
		if(this.state.lastCommand === ConsoleCommand.Search) {
			this.setState({
				searchText: this.state.searchInit?insert:this.textInsert(insert, this.state.searchText, replace),
				typer: this.child.typer.value,
			}, this.triggerSearch );
		} else {
			this.setState(Object.assign(
				this.consoleInsert(insert, replace),{
					typer: this.child.typer.value,
					lastCommand: ConsoleCommand.Default,
				}), this.scrollToBottom
			);
		}
	}
	paste = (e) => {
		let insert = e.clipboardData.getData('text');
	
		if(this.state.lastCommand === ConsoleCommand.Search) {
			this.setState({
				searchText: this.state.searchInit?insert:this.textInsert(insert, this.state.searchText),
				typer: this.child.typer.value,
			}, this.triggerSearch );
		} else {
			this.setState(Object.assign(
				this.consoleInsert(insert),{
					lastCommand: ConsoleCommand.Default,
				}), this.scrollToBottom
			);
		}
	}
	
	// Commands for Moving
	beginningOfLine = () => {
		this.setState({
			point: 0,
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, this.scrollToBottom);
	}
	endOfLine = () => {
		this.setState({
			point: this.state.promptText.length,
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, this.scrollToBottom);
	}
	forwardChar = () => {
		this.setState({
			point: this.movePoint(1),
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, this.scrollToBottom);
	}
	backwardChar = () => {
		this.setState({
			point: this.movePoint(-1),
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, this.scrollToBottom);
	}
	forwardWord = () => {
		this.setState({
			point: this.nextWord(),
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, this.scrollToBottom);
	}
	backwardWord = () => {
		this.setState({
			point: this.previousWord(),
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, this.scrollToBottom);
	}
	// Commands for Manipulating the History
	acceptLine = () => {
        this.child.typer.value = "";
		let command = this.state.promptText;
		let history = this.state.history;
		let log = this.state.log;

		commands.forEach(function(e) {
			if (command.toLowerCase().startsWith(e.match().toLowerCase())) {
				let env = {"pwd": "/"};
				let args = "";
				let out = e.do(args, env);
			}
		});

		if (!history || history[history.length-1] !== command) {
			history.push(command);
		}

		log.push({
			label: this.state.currLabel,
			command: command,
			message: "hello world"
		});

		window.a = log;

		this.setState({
			acceptInput: false,
			typer: "",
			point: 0,
			promptText: "",
			restoreText: "",
			log: log,
			history: history,
			historyn: 0,
			argument: null,
			lastCommand: ConsoleCommand.Default,
		}, () => {
			this.scrollToBottom();
			if (this.props.handler) {
				if (command === "clear") {
					this.return();
				} else {
					this.props.handler(command);
				}
			} else {
				this.return();
			}
		});
	}
	previousHistory = () => {
		this.rotateHistory(-1);
	}
	nextHistory = () => {
		this.rotateHistory(1);
	}
	beginningOfHistory = () => {
		this.rotateHistory(-this.state.history.length);
	}
	endOfHistory = () => {
		this.rotateHistory(this.state.history.length);
	}
	triggerSearch = () => {
		if(this.state.searchDirection === SearchDirection.Reverse) {
			this.reverseSearchHistory();
		} else {
			this.forwardSearchHistory();
		}
	}
	reverseSearchHistory = () => {
		if(this.state.lastCommand === ConsoleCommand.Search) {
			this.setState(Object.assign(
				this.searchHistory(SearchDirection.Reverse, true),{
					argument: `(reverse-i-search)\`${this.state.searchText}': `,
					lastCommand: ConsoleCommand.Search,
				}), this.scrollToBottom
			);
		} else {
			this.setState({
				searchDirection: SearchDirection.Reverse,
				searchInit: true,
				argument: `(reverse-i-search)\`': `,
				lastCommand: ConsoleCommand.Search,
			}, this.scrollToBottom);
		}
	}
	forwardSearchHistory = () => {
		if(this.state.lastCommand === ConsoleCommand.Search) {
			this.setState(Object.assign(
				this.searchHistory(SearchDirection.Forward, true),{
					argument: `(forward-i-search)\`${this.state.searchText}': `,
					lastCommand: ConsoleCommand.Search,
				}), this.scrollToBottom
			);
		} else {
			this.setState({
				searchDirection: SearchDirection.Forward,
				searchInit: true,
				argument: `(forward-i-search)\`': `,
				lastCommand: ConsoleCommand.Search,
			}, this.scrollToBottom);
		}
	}

	// Commands for Changing Text
	deleteChar = () => {
		if(this.state.point < this.state.promptText.length) {
			this.setState({
				promptText: this.state.promptText.substring(0,this.state.point)
					+ this.state.promptText.substring(this.state.point+1),
				argument: null,
				lastCommand: ConsoleCommand.Default,
			}, this.scrollToBottom);
		}
	}
	backwardDeleteChar = () => {
		if(this.state.lastCommand === ConsoleCommand.Search) {
			this.setState({
				searchText: this.state.searchText.substring(0,this.state.searchText.length-1),
				typer: this.child.typer.value,
			}, this.triggerSearch );
		} else if(this.state.point > 0) {
			this.setState({
				point: this.movePoint(-1),
				promptText: this.state.promptText.substring(0,this.state.point-1)
					+ this.state.promptText.substring(this.state.point),
				argument: null,
				lastCommand: ConsoleCommand.Default,
			}, this.scrollToBottom);
		}
	}
	// Killing
	killLine = () => {
		let kill = this.state.kill;
		if(this.state.lastCommand === ConsoleCommand.Kill) {
			kill[0] = kill[0] + this.state.promptText.substring(this.state.point);
		} else {
			kill.unshift(this.state.promptText.substring(this.state.point));
		}
		this.setState({
			promptText: this.state.promptText.substring(0,this.state.point),
			kill: kill,
			argument: null,
			lastCommand: ConsoleCommand.Kill,
		}, this.scrollToBottom);
	}
	
	cancelCommand = () => {
		if(this.state.acceptInput) { // Typing command
			this.child.typer.value = "";
			let log = this.state.log;
			log.push({
				label: this.state.currLabel,
				command: this.state.promptText,
				message: ""
			});
			this.setState({
				typer: "",
				point: 0,
				promptText: "",
				restoreText: "",
				log: log,
				historyn: 0,
				argument: null,
				lastCommand: ConsoleCommand.Default,
			}, this.scrollToBottom);
		} else { // command is executing, call handler
			this.props.cancel();
		}
	}
	// Helper functions
	textInsert = (insert, text, replace = 0, point = text.length) => {
		return text.substring(0, point - replace) + insert + text.substring(point);
	}
	consoleInsert = (insert, replace = 0) => {
		let promptText = this.textInsert(insert, this.state.promptText, replace, this.state.point);
		return {
			point: this.movePoint(insert.length - replace, insert.length - replace + this.state.promptText.length),
			promptText: promptText,
			restoreText: promptText,
			argument: null,
			lastCommand: ConsoleCommand.Default,
		};
	}
	movePoint = (n, max = this.state.promptText.length) => {
		let pos = this.state.point + n;
		if (pos < 0) {
			return 0;
		} if (pos > max) {
			return max;
		} else {
			return pos;
		}
	}
	nextWord() {
		// Find first alphanumeric char after first non-alphanumeric char
		let search = /\W\w/.exec(this.state.promptText.substring(this.state.point));
		if(search) {
			return search.index + this.state.point + 1;
		} else {
			return this.state.promptText.length;
		}
	}
	previousWord() {
		// Find first non-alphanumeric char after first alphanumeric char in reverse
		let search = /\W\w(?!.*\W\w)/.exec(this.state.promptText.substring(0,this.state.point-1));
		if(search) {
			return search.index + 1;
		} else {
			return 0;
		}
	}
	rotateRing = (n, ringn, ring, circular = true) => {
		if (ring === 0) return 0;
		if (circular) {
			return (ring + (ringn + n) % ring) % ring;
		} else {
			ringn = ringn - n;
			if(ringn < 0) {
				return 0;
			} else if (ringn >= ring) {
				return ring;
			} else {
				return ringn;
			}
		}
	}
	rotateHistory = (n) => {
		let historyn = this.rotateRing(n, this.state.historyn, this.state.history.length, false);
		if(historyn === 0) {
			this.setState({
				point: this.state.restoreText.length,
				promptText: this.state.restoreText,
				historyn: historyn,
				argument: null,
				lastCommand: ConsoleCommand.Default,
			}, this.scrollToBottom );
		} else {
			let promptText = this.state.history[this.state.history.length-historyn];
			this.setState({
				point: promptText.length,
				promptText: promptText,
				historyn: historyn,
				argument: null,
				lastCommand: ConsoleCommand.Default,
			}, this.scrollToBottom );
		}
	}
	searchHistory = (direction = this.state.searchDirection, next = false) => {
		let idx = this.state.historyn;
		let inc = (direction === SearchDirection.Reverse)?1:-1;
		if(next) {
			idx = idx + inc;
		}
		for(;idx > 0 && idx <= this.state.history.length; idx = idx + inc) {
			let entry = this.state.history[this.state.history.length-idx];
			let point = entry.indexOf(this.state.searchText);
			if(point > -1) {
				return {
					point: point,
					promptText: entry,
					searchDirection: direction,
					searchInit: false,
					historyn: idx,
				};
			}
		}
		return {
			searchDirection: direction,
			searchInit: false,
		};
	}
	// DOM management
	scrollSemaphore = 0;
	scrollIfBottom = () => {
		if(this.scrollSemaphore > 0 || this.child.container.scrollTop === this.child.container.scrollHeight - this.child.container.offsetHeight) {
			this.scrollSemaphore++;
			return this.scrollIfBottomTrue;
		} else {
			return null;
		}
	}
	scrollIfBottomTrue = () => {
		this.scrollToBottom();
		this.scrollSemaphore--;
	}
	scrollToBottom = () => {
		this.child.container.scrollTop = this.child.container.scrollHeight;
		let rect = this.child.focus.getBoundingClientRect();
		if(rect.top < 0 || rect.left < 0 ||
			rect.bottom > (window.innerHeight || document.documentElement.clientHeight) ||
			rect.right > (window.innerWidth || document.documentElement.clientWidth)
		) { this.child.typer.scrollIntoView(false); }
	}
	nextLabel = () => {
		if(typeof this.props.promptLabel === "string") {
			return this.props.promptLabel;
		} else {
			return (this.props.promptLabel);
		}
	}
	render() {
		return <div ref={ref => this.child.container = ref}
				className={`console-container ${(this.state.focus ? "console-focus" : "console-nofocus")}`}
				onClick={this.focus}
			>
			{this.props.welcomeMessage?
				<div className="console-message console-welcome">
					{this.props.welcomeMessage}
				</div>
				: null
			}
			{this.state.log.map( (val) => {
				return [
					<div>
						<ConsolePrompt label={val.label} value={val.command} />
						<ConsoleMessage value={val.message} />
					</div>
				];
			})}
			{this.state.acceptInput?
				<ConsolePrompt
					label={this.state.currLabel}
					value={this.state.promptText}
					point={this.state.point}
					argument={this.state.argument}
					/>
				: null
			}
			<div style={{ overflow: "hidden", height: 1, width: 1 }}>
				<textarea
					ref={ref => this.child.typer = ref}
					className="console-typer"
					autoComplete="off"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					style={{ outline: "none",
						color: "transparent",
						backgroundColor: "transparent",
						border: "none",
						resize: "none",
						overflow: "hidden",
					}}
					onBlur={this.blur}
					onKeyDown={this.keyDown}
					onChange={this.change}
					onPaste={this.paste}
				></textarea>
			</div>
			<div ref={ref => this.child.focus = ref}>&nbsp;</div>
		</div>;
	}
}

Console.defaultProps = {
    autofocus: true,
    promptLabel: '> ',
    continue: function() { return false; },
    cancel: function() {}
}

export default Console;
