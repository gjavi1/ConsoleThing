class Exit {
    static match() {
        return "exit";
    }

    static do(command, env) {
        console.log("exit hit");
        window.close();
        return {message: "Exit happened but it does nothing :) "};
    }
}

export default Exit;