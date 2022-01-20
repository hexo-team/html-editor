document.addEventListener('DOMContentLoaded', function() {
    function make_realtime_syntaxhighlight(original_code) {
        /* Tab key will write four spaces (otherwise it would jump to the next editable item */
        function tabs_to_spaces(event) {
            if (event.keyCode == 9) {
                document.execCommand('insertText', false, '    ');
                event.preventDefault();
            }
        }

        /* Highlight */
        function input_handler(event) {
            /* a contentEditable element likes <br>-s and Prism likes \n-s */
            var new_code = original_code.innerHTML.replace(/<br>/g, '\n');
            shadow_code.innerHTML = new_code;
            Prism.highlightElement(shadow_code);
        }


        var wrapper_div = document.createElement('div');
        var shadow_pre = document.createElement('pre');
        var shadow_code = document.createElement('code');
        var original_pre = original_code.parentNode;

        /* wrap original_pre and prepend shadow_pre */
        original_pre.parentNode.insertBefore(wrapper_div, original_pre);
        wrapper_div.appendChild(shadow_pre);
        wrapper_div.appendChild(original_pre);
        shadow_pre.appendChild(shadow_code);
        wrapper_div.className = 'realtime-editing-wrapper';
        shadow_pre.className = 'realtime-editing-shadow';
        original_pre.className = 'realtime-editing-editable';

        /* make editable. copy classname so that prism knows the language.
         * convert highlighted html to original_pre text (it might be already highlighted). */
        original_code.contentEditable = true;
        original_code.spellcheck = false;
        shadow_code.className = original_code.className;
        original_code.className = '';
        original_code.textContent = original_code.textContent;

        /* attach event handlers. trigger highlighting. */
        original_pre.addEventListener('keydown', tabs_to_spaces);
        original_pre.addEventListener('input', input_handler);
        original_pre.dispatchEvent(new InputEvent('input'));
    }


    var nodes = document.querySelectorAll('pre > code[class*=language-].editable');
    Array.prototype.forEach.call(nodes, make_realtime_syntaxhighlight);
});
