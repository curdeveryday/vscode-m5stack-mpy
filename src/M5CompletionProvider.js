const vscode = require('vscode');

let variables = [];

function startProvider () {
    const completions = [];
    
    /**
     * Button
     */
    completions[0] = new vscode.CompletionItem('btnA');
    completions[0].detail = 'ButtonA';
    completions[0].commitCharacters = ['.'];

    completions[1] = new vscode.CompletionItem('btnB');
    completions[1].detail = 'ButtonB';
    completions[1].commitCharacters = ['.'];

    completions[2] = new vscode.CompletionItem('btnC');
    completions[2].detail = 'ButtonC';
    completions[2].commitCharacters = ['.'];

    /**
     * Screen
     */
    completions[3] = new vscode.CompletionItem('setScreenColor', vscode.CompletionItemKind.Function);
    completions[3].detail = 'setScreenColor(color: int)';
    completions[3].documentation = new vscode.MarkdownString('Set Screen Color with RGB Hex value (0x000000 - 0xFFFFFF).');
    completions[3].insertText = new vscode.SnippetString('setScreenColor(${1:0x000000})');

    /**
     * Speaker
     */
    completions[4] = new vscode.CompletionItem('speaker', vscode.CompletionItemKind.Module);
    completions[4].detail = 'Speaker';
    completions[4].commitCharacters = ['.'];

    /**
     * RGB
     */
    completions[5] = new vscode.CompletionItem('rgb', vscode.CompletionItemKind.Module);
    completions[5].detail = 'Rgb';
    completions[5].commitCharacters = ['.'];

    /**
     * imu
     */
    completions[6] = new vscode.CompletionItem('imu', vscode.CompletionItemKind.Variable);
    completions[6].detail = 'imu';
    completions[6].documentation = new vscode.MarkdownString('Before use need to import module imu.\n\n```import imu```');
    completions[6].commitCharacters = ['.'];

    /**
     * Lcd
     */
    completions[7] = new vscode.CompletionItem('lcd', vscode.CompletionItemKind.Module);
    completions[7].detail = 'Lcd';
    completions[7].documentation = new vscode.MarkdownString('Module Lcd');
    completions[7].commitCharacters = ['.'];

    /**
     * Timer
     */
    completions[8] = new vscode.CompletionItem('wait', vscode.CompletionItemKind.Method);
    completions[8].detail = 'Delay few seconds.';
    completions[8].insertText = new vscode.SnippetString('wait(${1})');
    completions[9] = new vscode.CompletionItem('wait_ms', vscode.CompletionItemKind.Method);
    completions[9].detail = 'Delay few milliseconds.';
    completions[9].insertText = new vscode.SnippetString('wait_ms(${1})');
    completions[10] = new vscode.CompletionItem('time', vscode.CompletionItemKind.Module);
    completions[10].detail = 'Time';
    completions[10].commitCharacters = ['.'];

    /**
     * machine
     */
    completions[11] = new vscode.CompletionItem('machine', vscode.CompletionItemKind.Module);
    completions[11].detail = 'Machine';
    completions[11].commitCharacters = ['.'];

    /**
     * Auto add variable type
     */
    let variableCompletions = variables.map(item => {
        let completion = new vscode.CompletionItem(item.varname, vscode.CompletionItemKind.TypeParameter);
        completion.detail = item.type;
        completion.commitCharacters = ['.'];
        return completion;
    });

    return completions.concat(variableCompletions);
}

function endProvider (document, position, token, context) {
    let linePrefix = document.lineAt(position).text.substr(0, position.character);
    switch(true) {

        // Button
        case linePrefix.endsWith('btnA.'):
        case linePrefix.endsWith('btnB.'):
        case linePrefix.endsWith('btnC.'):
            {
                const completion0 = new vscode.CompletionItem('wasPressed', vscode.CompletionItemKind.Method);
                completion0.detail = 'wasPressed(event: func)';
                completion0.documentation = 'Set a event when the button was pressed.';
                completion0.insertText = new vscode.SnippetString('wasPressed(${1})');

                const completion1 = new vscode.CompletionItem('wasReleased', vscode.CompletionItemKind.Method);
                completion1.detail = 'wasReleased(event: func)';
                completion1.documentation = 'Set a event when the button was released.';
                completion1.insertText = new vscode.SnippetString('wasReleased(${1})');

                const completion2 = new vscode.CompletionItem('pressFor', vscode.CompletionItemKind.Method);
                completion2.detail = 'pressFor(interval: int|float, event: func)';
                completion2.documentation = 'Set a event when the button was pressed for a few millisecond.';
                completion2.insertText = new vscode.SnippetString('pressFor(${1})');

                const completion3 = new vscode.CompletionItem('wasDoublePress', vscode.CompletionItemKind.Method);
                completion3.detail = 'wasDoublePress(event: func)';
                completion3.documentation = 'Set a event when the button was double pressed.';
                completion3.insertText = new vscode.SnippetString('wasDoublePress(${1})');

                return [
                    completion0,
                    completion1,
                    completion2,
                    completion3
                ];
            }

        // Speaker
        case linePrefix.endsWith('speaker.'):
            {
                let completion0 = new vscode.CompletionItem('tone', vscode.CompletionItemKind.Method);
                completion0.detail = 'tone(frequency: int, duration: int)';
                completion0.insertText = new vscode.SnippetString('tone(${1:1800}, ${2: 200})');

                let completion1 = new vscode.CompletionItem('sing', vscode.CompletionItemKind.Method);
                completion1.detail = 'sing(frequency: int, part: int|float)';
                completion1.insertText = new vscode.SnippetString('sing(${1:220}, ${2: 1})');

                let completion2 = new vscode.CompletionItem('setVolume', vscode.CompletionItemKind.Method);
                completion2.detail = 'setVolume(volume: int)';
                completion2.documentation = 'Set the volume of the speaker.';
                completion2.insertText = new vscode.SnippetString('setVolume(${1:1})');
                
                return [
                    completion0,
                    completion1,
                    completion2
                ];
            }

        // RGB
        case linePrefix.endsWith('rgb.'):
            {
                let completion0 = new vscode.CompletionItem('setColor', vscode.CompletionItemKind.Method);
                completion0.detail = 'setColor(index: int, color: int)';
                completion0.documentation = new vscode.MarkdownString('Set the `index` rgb to the `color`.');
                completion0.insertText = new vscode.SnippetString('setColor(${1:1}, ${2:0xFFFFFF})');

                let completion1 = new vscode.CompletionItem('setColorFrom', vscode.CompletionItemKind.Method);
                completion1.detail = 'setColorFrom(start: int, end: int, color: int)';
                completion1.documentation = new vscode.MarkdownString('Set the rgb between `start` and `end` to the `color`.');
                completion1.insertText = new vscode.SnippetString('setColorFrom(${1:1}, ${2:5}, ${3:0xFFFFFF})');

                let completion2 = new vscode.CompletionItem('setColorAll', vscode.CompletionItemKind.Method);
                completion2.detail = 'setColorAll(color: int)';
                completion2.documentation = new vscode.MarkdownString('Set all rgb to the `color`.');
                completion2.insertText = new vscode.SnippetString('setColorAll(${1:0xFFFFFF})');

                let completion3 = new vscode.CompletionItem('setBrightness', vscode.CompletionItemKind.Method);
                completion3.detail = 'setBrightness(brightness: int)';
                completion3.documentation = new vscode.MarkdownString('Set the brightness of rgb.');
                completion3.insertText = new vscode.SnippetString('setBrightness(${1:10})');

                return [
                    completion0,
                    completion1,
                    completion2,
                    completion3
                ];
            }

        // imu
        case linePrefix.endsWith('imu.'):
            {
                let completion0 = new vscode.CompletionItem('IMU', vscode.CompletionItemKind.Constructor);
                completion0.detail = 'IMU()';
                completion0.documentation = 'Initance imu object';
                completion0.insertText = new vscode.SnippetString('IMU()');
                completion0.command = {
                    command: 'm5py.add.type',
                    arguments: ['imu', linePrefix, variables],
                    title: 'trigger'
                };

                return [
                    completion0
                ];
            }
        
        // Lcd
        case linePrefix.endsWith('lcd.'):
            {
                let fonts = ["FONT_Default", "FONT_Default_Small", "FONT_DejaVu18", "FONT_DejaVu24", "FONT_DejaVu40", "FONT_DejaVu56", "FONT_DejaVu72", "FONT_Ubuntu", "FONT_Comic"];
                let fontCompletion = fonts.map(font => {
                    let completion = new vscode.CompletionItem(font, vscode.CompletionItemKind.Constant);
                    return completion;
                });

                let completion0 = new vscode.CompletionItem('clear', vscode.CompletionItemKind.Method);
                completion0.detail = 'clear(color?: int)';
                completion0.documentation = new vscode.MarkdownString('Clear screen by a color.\n\n@_param_ `color` —— The color of the screen, default value is black.');
                completion0.insertText = new vscode.SnippetString('clear(${1})');

                let completion1 = new vscode.CompletionItem('fill', vscode.CompletionItemKind.Method);
                completion1.detail = 'fill(color: int)';
                completion1.documentation = new vscode.MarkdownString('Fill screen by a color.\n\n@_param_ `color` —— The color of the screen.');
                completion1.insertText = new vscode.SnippetString('fill(${1})');

                let completion2 = new vscode.CompletionItem('print', vscode.CompletionItemKind.Method);
                completion2.detail = 'print(text: string, x: int, y: int, color: int)';
                completion2.documentation = new vscode.MarkdownString('Print text in screen.\n\n@_param_ `text` —— Text to display.\n\n@_param_ `x` —— The X coordinate of the text\n\n@_param_ `y` —— The Y coordinate of the text\n\n@_param_ `color` —— The color of the text');
                completion2.insertText = new vscode.SnippetString('print(\'${1}\', ${2:0}, ${3:0}, ${4:0xFFFFFF})');

                let completion3 = new vscode.CompletionItem('font', vscode.CompletionItemKind.Method);
                completion3.detail = 'font(font: string)';
                completion3.documentation = new vscode.MarkdownString('Set font of the text.\n\n@_param_ `text` —— Text to display.\n\n@_param_ `font` —— Font type.There are `FONT_Default`, `FONT_Default_Small`, `FONT_DejaVu18`, `FONT_DejaVu24`, `FONT_DejaVu40`, `FONT_DejaVu56`, `FONT_DejaVu72`, `FONT_Ubuntu`, `FONT_Comic`');
                completion3.insertText = new vscode.SnippetString('font(lcd.${1|FONT_Default,FONT_Default_Small,FONT_DejaVu18,FONT_DejaVu24,FONT_DejaVu40,FONT_DejaVu56,FONT_DejaVu72,FONT_Ubuntu,FONT_Comic|})');

                let completion4 = new vscode.CompletionItem('pixel', vscode.CompletionItemKind.Method);
                completion4.detail = 'pixel(x: int, y: int, color: int)';
                completion4.documentation = new vscode.MarkdownString('Draw a pixel in screen.\n\n@_param_ `x` —— The X coordinate of the pixel.\n\n@_param_ `y` —— The Y coordinate of the pixel.\n\n@_param_ `color` —— The color of the pixel.');
                completion4.insertText = new vscode.SnippetString('pixel(${1:0}, ${2:0}, ${3:0xFFFFFF})');

                let completion5 = new vscode.CompletionItem('line', vscode.CompletionItemKind.Method);
                completion5.detail = 'line(x1: int, y1: int, x2: int, y2: int, color: int)';
                completion5.documentation = new vscode.MarkdownString('Draw a line in screen.\n\n@_param_ `x1` —— The X coordinate of the start point.\n\n@_param_ `y1` —— The Y coordinate of the start point.\n\n@_param_ `x2` —— The X coordinate of the end point.\n\n@_param_ `y2` —— The Y coordinate of the end point.\n\n@_param_ `color` —— The color of the line.');
                completion5.insertText = new vscode.SnippetString('line(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})');

                let completion6 = new vscode.CompletionItem('rect', vscode.CompletionItemKind.Method);
                completion6.detail = 'rect(x1: int, y1: int, x2: int, y2: int, color: int)';
                completion6.documentation = new vscode.MarkdownString('Draw a rectangle in screen.\n\n@_param_ `x1` —— The X coordinate of the start point.\n\n@_param_ `y1` —— The Y coordinate of the start point.\n\n@_param_ `x2` —— The X coordinate of the end point.\n\n@_param_ `y2` —— The Y coordinate of the end point.\n\n@_param_ `color` —— The color of the rectangle.');
                completion6.insertText = new vscode.SnippetString('rect(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})');

                let completion7 = new vscode.CompletionItem('triangle', vscode.CompletionItemKind.Method);
                completion7.detail = 'triangle(x: int, y: int, x1: int, y1: int, x2: int, y2: int, color: int)';
                completion7.documentation = new vscode.MarkdownString('Draw a triangle in screen.\n\n@_param_ `x` —— The X coordinate of the point A.\n\n@_param_ `y` —— The Y coordinate of the point A.\n\n@_param_ `x1` —— The X coordinate of the point B.\n\n@_param_ `y1` —— The Y coordinate of the point B.\n\n@_param_ `x2` —— The X coordinate of the point C.\n\n@_param_ `y2` —— The Y coordinate of the point C.\n\n@_param_ `color` —— The color of the triangle.');
                completion7.insertText = new vscode.SnippetString('triangle(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0}, ${7:0xFFFFFF})');

                let completion8 = new vscode.CompletionItem('circle', vscode.CompletionItemKind.Method);
                completion8.detail = 'circle(x: int, y: int, radius: int, color: int)';
                completion8.documentation = new vscode.MarkdownString('Draw a circle in screen.\n\n@_param_ `x` —— The X coordinate of the centroid coordinates.\n\n@_param_ `y` —— The Y coordinate of the  centroid coordinates.\n\n@_param_ `radius` —— The radius of the circle.\n\n@_param_ `color` —— The color of the triangle.');
                completion8.insertText = new vscode.SnippetString('circle(${1:0}, ${2:0}, ${3:10}, ${7:0xFFFFFF})');

                let completion9 = new vscode.CompletionItem('ellipse', vscode.CompletionItemKind.Method);
                completion9.detail = 'ellipse(x: int, y: int, rx: int, ry: int, color: int)';
                completion9.documentation = new vscode.MarkdownString('Draw a ellipse in screen.');
                completion9.insertText = new vscode.SnippetString('ellipse(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0xFFFFFF})');

                let completion11 = new vscode.CompletionItem('arc', vscode.CompletionItemKind.Method);
                completion11.detail = 'arc(x: int, y: int, radius: int, thick: int, start: int, end: int, color: int)';
                completion11.documentation = new vscode.MarkdownString('Draw a arc in screen.');
                completion11.insertText = new vscode.SnippetString('arc(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0}, ${7:0xFFFFFF})');

                let completion12 = new vscode.CompletionItem('polygon', vscode.CompletionItemKind.Method);
                completion12.detail = 'polygon(x: int, y: int, radius: int, sides: int, thick: int, color: int)';
                completion12.documentation = new vscode.MarkdownString('Draw a polygon in screen.');
                completion12.insertText = new vscode.SnippetString('polygon(${1:0}, ${2:0}, ${3:0}, ${4:0}, ${5:0}, ${6:0xFFFFFF})');

                return [
                    completion0,
                    completion1,
                    completion2,
                    completion3,
                    completion4,
                    completion5,
                    completion6,
                    completion7,
                    completion8,
                    completion9,
                    completion11,
                    completion12
                ].concat(fontCompletion);
            }
        
        // Time
        case linePrefix.endsWith('time.'):
            {
                let completion0 = new vscode.CompletionItem('ticks_ms', vscode.CompletionItemKind.Method);
                completion0.detail = 'ticks_ms()';
                completion0.documentation = new vscode.MarkdownString('Get ticks by millisecond.');
                completion0.insertText = new vscode.SnippetString('ticks_ms()');
                return [
                    completion0
                ];
            }

        case linePrefix.endsWith('machine.'):
            {
                let completion0 = new vscode.CompletionItem('ADC', vscode.CompletionItemKind.Constructor);
                completion0.detail = 'ADC(pin: int)';
                completion0.documentation = new vscode.MarkdownString('Init a ADC object.\n\n@_param_ `pin` —— Pin value must be between 32 and 39');
                completion0.insertText = new vscode.SnippetString('ADC(${1})');

                let completion1 = new vscode.CompletionItem('DAC', vscode.CompletionItemKind.Constructor);
                completion1.detail = 'DAC(pin: int)';
                completion1.documentation = new vscode.MarkdownString('Init a DAC object.\n\n@_param_ `pin` —— Pin value only can be 25 or 26');
                completion1.insertText = new vscode.SnippetString('DAC(${1|25,26|})');

                let completion2 = new vscode.CompletionItem('UART', vscode.CompletionItemKind.Constructor);
                completion2.detail = 'UART()';
                completion2.documentation = new vscode.MarkdownString('Init a UART object.');
                completion2.insertText = new vscode.SnippetString('UART(1, tx=17, rx=16)');

                let completion3 = new vscode.CompletionItem('PWM', vscode.CompletionItemKind.Constructor);
                completion3.detail = 'PWM()';
                completion3.documentation = new vscode.MarkdownString('Init a PWM object.');
                completion3.insertText = new vscode.SnippetString('PWM(${1})');

                let completion4 = new vscode.CompletionItem('Pin', vscode.CompletionItemKind.Constructor);
                completion4.detail = 'Pin()';
                completion4.documentation = new vscode.MarkdownString('Init a Pin object.');
                completion4.insertText = new vscode.SnippetString('Pin(${1})');
                
                return [
                    completion0,
                    completion1,
                    completion2,
                    completion3,
                    completion4
                ];
            }

        default:
            break;
    }

    for(let i = 0; i < variables.length; i++) {
        switch(variables[i].type) {
            case 'imu':
                let completion0 = new vscode.CompletionItem('ypr', vscode.CompletionItemKind.Variable);
                completion0.detail = 'Array for Yaw, Pitch, Roll values';
                completion0.insertText = new vscode.SnippetString('ypr[${1|0,1,2|}]');

                let completion1 = new vscode.CompletionItem('acceleration', vscode.CompletionItemKind.Variable);
                completion1.detail = 'Array for acceleration Yaw, Pitch, Roll values';
                completion1.insertText = new vscode.SnippetString('acceleration[${1|0,1,2|}]');

                let completion2 = new vscode.CompletionItem('gyro', vscode.CompletionItemKind.Variable);
                completion2.detail = 'Array for gyro Yaw, Pitch, Roll values';
                completion2.insertText = new vscode.SnippetString('gyro[${1|0,1,2|}]');
                return [
                    completion0,
                    completion1,
                    completion2
                ];
        }
    }

    return undefined;
}

const StartProvider = vscode.languages.registerCompletionItemProvider({scheme: 'm5stackfs', language: 'python'}, { provideCompletionItems: startProvider});
const EndProvider = vscode.languages.registerCompletionItemProvider({scheme: 'm5stackfs', language: 'python'}, { provideCompletionItems: endProvider}, '.');

module.exports = {
    StartProvider,
    EndProvider
}