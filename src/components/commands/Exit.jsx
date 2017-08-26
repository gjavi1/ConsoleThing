class Exit {
    static match() {
        return "exit";
    }
    static do() {
        console.log("exit hit");
        window.close();
    }
}

export default Exit;