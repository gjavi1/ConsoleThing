class Exit {
    static match() {
        return "exit";
    }
    static do(command) {
        console.log("exit hit");
        window.close();
        return {message: "Exit happened but it does nothing :) " + command};
    }
}

export default Exit;