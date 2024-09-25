export const execLsCommand = (command, tree, currentPath) => {
    if (command !== 'ls') {
        return 'invalid command syntax!';
    }

    const nodes = verifyPath(currentPath, tree);
    if (!nodes) {
        return 'invalid path!';
    }

    let files = Object.keys(nodes);
    return files.toString().replaceAll(',', '   ');
}


export const execMkdirCommand = (command, tree, currentPath, setTree) => {
    const breakCommand = command.split(' ');
    if (breakCommand.length < 2) {
        return 'invalid command syntax!';
    }
    let newTree = { ...tree };
    for (let i = 1; i < breakCommand.length; i++) {
        let path = currentPath + breakCommand[i];
        if (breakCommand[i][0] === '/') {
            path = breakCommand[i];
        }
        const pathArray = path.split('/').filter(x => x !== "");
        const newNode = pathArray[pathArray.length - 1];
        const parentPath = pathArray.slice(0, pathArray.length - 1).join('/');
        let parentNodes = verifyPath(parentPath || '/', newTree);
        if (!parentNodes) {
            return 'invalid path!';
        }
        parentNodes[newNode] = {};
    }
    setTree({ ...newTree });
    return '';
}


export const execCdCommand = (command, currentPath, tree) => {
    const breakCommand = command.split(' ');

    if (breakCommand.length !== 2) {
        return 'invalid command syntax!';
    }

    let newPath;

    if (breakCommand[1] === '/') {
        newPath = '/';
    } else if (breakCommand[1] === '..') {
        if (currentPath !== '/') {
            newPath = createNewPath(breakCommand[1], currentPath);
        }
    } else {
        newPath = createNewPath(breakCommand[1], currentPath);
    }

    if (verifyPath(newPath, tree) && !(breakCommand[0][breakCommand[0].length - 1] === '/')) {
        window.localStorage.setItem('currentPath', newPath);
        return '';
    } else {
        return 'invalid path!';
    }
}

const createNewPath = (pathArg, currentPath) => {
    let newPath;
    if (pathArg === '..') {
        newPath = '/' + currentPath.split('/').filter(x => x !== '').slice(0, -1).join('/') + '/';
        if (newPath === "//") {
            newPath = '/';
        }
    } else if (pathArg[0] === '/') {
        newPath = pathArg + '/';
    } else if (pathArg.substring(0, 2) === './') {
        newPath = pathArg.replace('.', currentPath === '/' ? '' : currentPath.slice(0,-1))+'/';
    } else {
        newPath = `${currentPath}${pathArg}/`;
    }
    return newPath;
}



const verifyPath = (path, tree) => {
    let pathArray = path.split('/').filter(x => x!=="")
    let nodes = tree['/']
    for (let i = 0; i < pathArray.length; i++) {
        const ele = pathArray[i];
        nodes = nodes[ele];
        if(!nodes){
            return null
        }
    }
    return nodes
}

export const execCpCommand = (command, tree, currentPath) => {
    const breakCommand = command.split(' ')
    if(breakCommand.length!==3){
        return 'invalid command syntax!'
    }
    breakCommand[1] = createNewPath(breakCommand[1],currentPath).slice(0.-1)
    breakCommand[2] = createNewPath(breakCommand[2],currentPath).slice(0,-1)
    let sourceNode = verifyPath(breakCommand[1], tree)
    let targetNode = verifyPath(breakCommand[2], tree)

    if(sourceNode && targetNode){
        targetNode[breakCommand[1].split('/')[breakCommand[1].split('/').length-1]] = structuredClone(sourceNode)
        return ''
    }
    return 'invalid command syntax!'
}

export const execRmCommand = (command, tree, currentPath) => {
    
}