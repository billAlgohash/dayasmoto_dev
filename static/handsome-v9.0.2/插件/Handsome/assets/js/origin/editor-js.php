<?php

function initChoice($content)
{
    $config = Typecho_Widget::widget('Widget_Options')->plugin('Handsome');
    $editorChoice = $config->editorChoice;

    if (Handsome_Plugin::isPluginAvailable("EditorMD_Plugin", "EditorMD")) {
        $editorChoice = "others";
    }

    ?>

    <style>
        input[type=text], input[type=password], input[type=email], textarea {
            width: 100%;
        }

        body {
            position: relative;
        }
    </style>
    <?php

    if ($editorChoice == "origin") {
        choseOrigin($content);
    }

    if ($editorChoice == "vditor") {
        choseVditor($content);
    }


    if ($editorChoice == "others") {
        choseOther();
    }

}

function choseOrigin($content)
{


    $options = Helper::options();

    $suffixVersion = "handsome";

    $page = $content;
    $post = $content;

    include __TYPECHO_ROOT_DIR__ . __TYPECHO_ADMIN_DIR__ . 'editor-js.php';
    ?>

    <style>
        #text {
            display: block !important;
        }

        #wmd-button-bar {
            display: block;
        }
    </style>


    <script>
        var themeUrl = '<?php echo $options->themeUrl?>/';
        var themeAssetsUrl = '<?php echo $options->themeUrl?>/assets/';
        window['LocalConst'] = {
            BASE_SCRIPT_URL: themeUrl,
            STATIC_PATH: themeAssetsUrl,
            MUSIC_API: '<?php echo Typecho_Common::url('action/handsome-meting-api?do=parse', Helper::options()->index);
                ?>'
        }
    </script>

    <script src="<?php echo $options->themeUrl ?>/assets/js/origin/OwO.min.js"></script>
    <script src="<?php echo $options->pluginUrl ?>/Handsome/assets/js/editor.min.js"></script>
    <link rel="stylesheet" href="<?php echo $options->themeUrl ?>/assets/css/origin/owo.min.css" type="text/css"/>
    <link rel="stylesheet" href="<?php echo $options->pluginUrl ?>/Handsome/assets/css/editor.css" type="text/css"/>
    <?php

}


function choseVditor($content)
{

    $config = Typecho_Widget::widget('Widget_Options')->plugin('Handsome');
    $vditorMode = $config->vditorMode == "" ? "sv" : $config->vditorMode;

    Utils::initGlobalDefine();
    $vditorCDN = Utils::getLocalCDN("vditor/dist/js/lute", "vditor", "vditor");
    $cssUrl = $vditorCDN . '/dist/index.css?v=9.0.2';
    $jsUrl = $vditorCDN . '/dist/index.min.js?v=9.0.2';
    ?>


    <script>
        window['LocalConst'] = {
            VDITOR_CDN: '<?php echo $vditorCDN; ?>',

            MUSIC_API: '<?php echo Typecho_Common::url('action/handsome-meting-api?do=parse', Helper::options()->index);
                ?>'
            //IS_SUPPORT_EMOJI: '<?php //echo Typecho_Db::get()->getConfig(0)[0]->charset == "utf8mb4" ?>//'
        }
    </script>
    <link rel="stylesheet" href="<?php echo $cssUrl; ?>"/>
    <script type="text/javascript" src="<?php echo $jsUrl; ?>"></script>

    <style>
        #text {
            display: none;
        }

        #wmd-button-bar {
            display: none;
        }
    </style>
    <script>
        var submitted = false;

        $(window).bind('beforeunload', function (e) {
            var msg = "";
            e.returnValue = msg;
            if (!submitted) {
                submitted = false;
                return msg;
            }
        });


        $(document).ready(function () {
            //================== typecho ????????????????????? ==================


            function updateAttacmentNumber() {
                var btn = $('#tab-files-btn'),
                    balloon = $('.balloon', btn),
                    count = $('#file-list li .insert').length;

                if (count > 0) {
                    if (!balloon.length) {
                        btn.html($.trim(btn.html()) + ' ');
                        balloon = $('<span class="balloon"></span>').appendTo(btn);
                    }

                    balloon.html(count);
                } else if (0 == count && balloon.length > 0) {
                    balloon.remove();
                }
            }

            $('.upload-area').bind({
                dragenter: function () {
                    $(this).parent().addClass('drag');
                },

                dragover: function (e) {
                    $(this).parent().addClass('drag');
                },

                drop: function () {
                    $(this).parent().removeClass('drag');
                },

                dragend: function () {
                    $(this).parent().removeClass('drag');
                },

                dragleave: function () {
                    $(this).parent().removeClass('drag');
                }
            });

            updateAttacmentNumber();

            function fileUploadStart(file) {
                //todo data-image ??????????????????
                console.log("fileUploadStart", file);
                $('<li data-url="' + file.url + '" data-image="1" id="' + file.id + '" class="loading">'
                    + file.name + '</li>').appendTo('#file-list');
            }

            function fileUploadError(error) {
                var file = error.file, code = error.code, word;

                switch (code) {
                    case plupload.FILE_SIZE_ERROR:
                        word = '????????????????????????';
                        break;
                    case plupload.FILE_EXTENSION_ERROR:
                        word = '???????????????????????????';
                        break;
                    case plupload.FILE_DUPLICATE_ERROR:
                        word = '?????????????????????';
                        break;
                    case plupload.HTTP_ERROR:
                    default:
                        word = '??????????????????';
                        break;
                }

                var fileError = '%s ????????????'.replace('%s', file.name),
                    li, exist = $('#' + file.id);

                if (exist.length > 0) {
                    li = exist.removeClass('loading').html(fileError);
                } else {
                    li = $('<li>' + fileError + '<br />' + word + '</li>').appendTo('#file-list');
                }

                li.effect('highlight', {color: '#FBC2C4'}, 2000, function () {
                    $(this).remove();
                });

                try {
                    // fix issue #341
                    this.removeFile(file);
                } catch (e) {

                }
            }

            var completeFile = null;

            function fileUploadComplete(id, url, data) {
                // console.log("fileUploadComplete" + id);
                var li = $('#' + id).removeClass('loading').data('cid', data.cid)
                    .data('url', data.url)
                    .data('image', data.isImage)
                    .html('<input type="hidden" name="attachment[]" value="' + data.cid + '" />'
                        + '<a class="insert" href="###" title="??????????????????">' + data.title + '</a><div class="info">' + data.bytes
                        + ' <a class="file" target="_blank" href="' + meida_url + '?cid='
                        + data.cid + '" title="??????"><i class="i-edit"></i></a>'
                        + ' <a class="delete" href="###" title="??????"><i class="i-delete"></i></a></div>')
                    .effect('highlight', 1000);

                attachInsertEvent(li);
                attachDeleteEvent(li);
                updateAttacmentNumber();

                if (!completeFile) {
                    completeFile = data;
                }
            }

            function attachInsertEvent(el) {
                $('.insert', el).click(function () {
                    var t = $(this), p = t.parents('li');
                    Typecho.insertFileToEditor(t.text(), p.data('url'), p.data('image'));
                    return false;
                });
            }

            function attachDeleteEvent(el) {
                var file = $('a.insert', el).text();
                $('.delete', el).click(function () {
                    if (confirm('????????????????????? %s ????'.replace('%s', file))) {
                        var cid = $(this).parents('li').data('cid');
                        $.post(media_edit_url,
                            {'do': 'delete', 'cid': cid},
                            function () {
                                $(el).fadeOut(function () {
                                    $(this).remove();
                                    updateAttacmentNumber();
                                });
                            });
                    }

                    return false;
                });
            }

            var options = {};

            /**
             *
             * @param label input?????????????????????
             * @param id ???????????????????????????input??????????????? ret?????????????????????
             * @param prefix ??????????????????
             * @param value ??????????????????
             * @param ajax_url ??????????????????????????????????????????ajax??????
             * @param replace_id ???ajax????????????????????????ret????????????????????????????????????????????????????????????ajax?????????????????????ret
             * @param select ??????????????????????????????????????????input
             * @param type input?????????input ?????????,select ?????????,textarea ?????????
             * @param options
             * @returns {{select: boolean, ajax_url: *, prefix: *, replace_id: *, label: *, id: *, type: *, value: *}}
             */
            function returnDialogInputItem(label, id, prefix, value, options = [], select = true, type = "input", ajax_url = "",
                                           replace_id = "") {
                return {
                    "label": label,
                    "id": id,
                    "prefix": prefix,
                    "value": value,
                    "select": select,
                    "ajax_url": ajax_url,
                    "replace_id": replace_id,
                    "type": type,
                    "options": options
                };
            }

            function returnOptionItem(value, text) {
                return {"value": value, "text": text};
            }

            options.strings = {
                colorWordDialog: {
                    "type": "color",
                    "intro": '<p><b><?php _e('???????????????????????????'); ?></b></p>',
                    "input": [
                        returnDialogInputItem("??????<a target='_blank' href='https://www.w3school.com.cn/cssref/css_colors.asp'>????????????</a>", "COLOR_VALUE", "", ""),
                        returnDialogInputItem("????????????", "WORD_VALUE", "", ""),
                    ],
                    "ret": '[font color="COLOR_VALUE"]WORD_VALUE[/font]\n'


                },
                imagedialog: {
                    "type": "image",
                    "intro": '<p><b><?php _e('????????????'); ?></b></p><p><?php _e('???????????????????????????????????????????????????????????????'); ?></p><p><?php _e('?????????????????????????????????????????????????????????'); ?></p>',
                    "input": [
                        returnDialogInputItem("", "IMAGE_URL", "http://", "")
                    ],
                    "ret": "![?????????????????????](IMAGE_URL)"
                },
                linkdialog: {
                    "type": "link",
                    "intro": '<p><b><?php _e('????????????'); ?></b></p><p><?php _e('?????????????????????????????????????????????????????????'); ?></p>',
                    "input": [
                        returnDialogInputItem("", "LINK_URL", "http://", ""),
                    ],
                    "ret": "[?????????????????????](LINK_URL)"
                },
                musicdialog: {
                    "type": "music",
                    "intro": '<p><b>????????????</b></p><p>????????????????????????????????????????????????????????? </p><p style="color: ' +
                        '#ff0012">????????????????????????????????????????????????????????????????????????????????????????????????</p><a target="_blank" href="https://handsome' +
                        '.ihewro' +
                        '.com/#/functions?id=%e6%96%87%e7%ab%a0%e5%86%85%e6%8f%92%e5%85%a5%e9%9f%b3%e4%b9%90">????????????</a>',
                    "input": [
                        returnDialogInputItem("", "MUSIC_URL", "http://", "", [], true, "textarea", LocalConst
                                .MUSIC_API,
                            "MUSIC_ID"),
                    ],
                    "ret": '[hplayer media="netease" id="MUSIC_ID" type="song" size="large" auto="false" /]'
                },
                citeDialog: {
                    type: "cite",
                    intro: "<p><b>??????????????????</b></p>",
                    input: [
                        returnDialogInputItem("??????", "CITE_TYPE", "", "", [returnOptionItem("share", "?????????"), returnOptionItem
                        ("yellow", "?????????"), returnOptionItem("red", "?????????"), returnOptionItem("blue", "?????????"), returnOptionItem
                        ("green", "?????????")], true, "select"),
                        returnDialogInputItem("??????", "SIZE_TYPE", "", "", [returnOptionItem("", "???????????????????????????"), returnOptionItem("simple", "????????????????????????"), returnOptionItem("small", "???????????????????????????????????????")], true, "select"),
                    ],
                    "ret": '[scode type="CITE_TYPE" size="SIZE_TYPE"]????????????????????????[/scode]'
                },
                buttonDialog: {
                    type: "button",
                    intro: "<p><b>????????????</b></p>",
                    input: [
                        returnDialogInputItem("????????????", "LINK_TEXT", "", ""),
                        returnDialogInputItem("????????????", "LINK_URL", "http://", ""),
                        returnDialogInputItem("??????????????????????????????", "LINK_ICON", "", ""),
                        returnDialogInputItem("??????", "BUTTON_COLOR", "", "", [returnOptionItem("light", "??????"), returnOptionItem
                        ("info", "??????"), returnOptionItem("dark", "??????"), returnOptionItem("success", "??????"), returnOptionItem
                        ("black", "??????"), returnOptionItem("warning", "??????"), returnOptionItem("primary", "??????"), returnOptionItem
                        ("danger", "??????")], true, "select"),
                        returnDialogInputItem("??????", "BUTTON_TYPE", "", "", [returnOptionItem("", "??????"), returnOptionItem
                        ("round", "?????????")], false, "select")
                    ],
                    "ret": '[button color="BUTTON_COLOR" icon="LINK_ICON" url="LINK_URL" type="BUTTON_TYPE"]LINK_TEXT[/button]'
                },
                postDialog: {
                    "type": "post",
                    "intro": '<p>???????????????????????????????????????????????????????????????????????????????????????<a target="_blank" href="https://handsome.ihewro' +
                        '.com/#/functions?id=%e6%96%87%e7%ab%a0%e5%86%85%e8%b0%83%e7%94%a8%e5%85%b6%e4%bb%96%e6%96%87%e7' +
                        '%ab%a0">????????????</a></p>',
                    "input": [
                        returnDialogInputItem("???????????????cid????????????", "POST_CID", "", ""),
                        returnDialogInputItem("?????????????????????????????????", "POST_THUMB", "http://", ""),
                        returnDialogInputItem("??????", "SIZE_TYPE", "", "", [returnOptionItem("", "????????????"), returnOptionItem("small", "??????????????????????????????????????????")], true, "select"),
                    ],
                    "ret": '[post cid="POST_CID" cover="POST_THUMB" size="SIZE_TYPE"/]'
                },
                videoDialog: {
                    "type": "video",
                    "intro": '<p>????????????????????????????????????????????????????????????<a target="_blank" href="https://handsome.ihewro' +
                        '.com/#/functions?id=%e6%96%87%e7%ab%a0%e5%86%85%e6%8f%92%e5%85%a5%e8%a7%86%e9%a2%91">????????????</a></p>',
                    "input": [
                        returnDialogInputItem("???????????????????????????,???xxx.mp4???", "VIDEO_URL", "", "",[],false,"textarea"),
                        returnDialogInputItem("?????????????????????????????????", "VIDEO_THUMB", "http://", ""),
                    ],
                    "ret": '[vplayer url="VIDEO_URL" pic="VIDEO_THUMB"]VIDEO_URL[/vplayer]',
                    getRetCallback: function () {
                        const url_content = document.getElementById("VIDEO_URL").value;
                        const url_split = url_content.split(/[\n]/);
                        if (url_split.length > 1 || (url_split.length === 1 && url_split[0].split("$").length === 2)){
                            return '[vplayer]VIDEO_URL[/vplayer]';
                        }else{
                            return '[vplayer url="VIDEO_URL" pic="VIDEO_THUMB" /]';
                        }
                    },
                    elementRetCallback: function (ret,id,value) {
                        if (id==="VIDEO_URL"){
                            const url_split = value.split(/[\n]/);
                            if (url_split.length > 1 || (url_split.length === 1 && url_split[0].split("$").length === 2)){
                                var new_value = "";

                                var index = 0 ;
                                url_split.forEach(function (item_video) {
                                    console.log(item_video);
                                    const video = item_video.split("$");
                                    if (index === 0){
                                        new_value += "\n";
                                    }
                                    index++;
                                    if (video.length === 2){
                                        new_value += '[Video url="'+video[1] + '" title="' + video[0] + '" /]\n';
                                    }
                                });

                                console.log(new_value);

                                return ret.replace(id, new_value);
                            }else{
                                return ret.replace(id, value);
                            }
                        }else{
                            return ret.replace(id, value);

                        }

                    },
                },
                collapseDialog: {
                    type: "collapse",
                    "intro": '',
                    input: [
                        returnDialogInputItem("??????", "COLLASE_TTILE", "", ""),
                        returnDialogInputItem("??????????????????", "COLLASE_STATUS", "", "", [returnOptionItem("true", "??????"),
                            returnOptionItem
                            ("false", "?????????")], false, "select")
                    ],
                    ret: '[collapse status="COLLASE_STATUS" title="COLLASE_TTILE"]???????????????????????????[/collapse]'
                }
            };

            function promptDialog(dialogContent) {
                var dialogContent;
                var dialog;
                var dialogBackground;
                g = window.navigator;
                var w = window.document;
                createBackground();
                construct();

                function createBackground() {
                    var v = {
                        isIE: /msie/.test(g.userAgent.toLowerCase()),
                        isIE_5or6: /msie 6/.test(g.userAgent.toLowerCase()) || /msie 5/.test(g.userAgent.toLowerCase()),
                        isOpera: /opera/.test(g.userAgent.toLowerCase())
                    };
                    dialogBackground = w.createElement("div"), z = dialogBackground.style;
                    dialogBackground.className = "wmd-prompt-background";
                    z.position = "absolute";
                    z.top = "0";
                    z.bottom = "0";
                    z.zIndex = "1000";
                    if (v.isIE) {
                        z.filter = "alpha(opacity=50)"
                    } else {
                        z.opacity = "0.5"
                    }
                    // var x = u.getPageSize();
                    z.height = "100%";
                    if (v.isIE) {
                        z.left = w.documentElement.scrollLeft;
                        z.width = w.documentElement.clientWidth
                    } else {
                        z.left = "0";
                        z.width = "100%"
                    }
                    w.body.appendChild(dialogBackground);
                }

                function construct() {
                    dialog = w.createElement("div");
                    dialog.className = "wmd-prompt-dialog";
                    dialog.setAttribute("role", "dialog");
                    const intro = w.createElement("div");
                    intro.innerHTML = dialogContent.intro;

                    dialog.appendChild(intro);

                    //?????????????????????
                    const form = w.createElement("form");
                    form.onsubmit = function () {
                        return _click(false)
                    };
                    dialog.appendChild(form);


                    //????????????label ??? input
                    dialogContent.input.forEach(function (element) {
                        if (element.label !== "") {
                            const _label = w.createElement("label");
                            _label.innerHTML = element.label;
                            form.appendChild(_label);
                        }
                        //??????input?????????
                        if (element.type === "input" || element.type === "textarea") {
                            const _input = w.createElement(element.type);
                            _input.type = "text";
                            _input.id = element.id;
                            if (element.value === "") {
                                _input.placeholder = element.prefix;
                            } else {
                                // _input.placeholder = element.value;
                                _input.value = element.value;
                            }
                            if (element.type === "textarea") {
                                _input.style.marginBottom = "10px";
                            }
                            form.appendChild(_input);
                            //todo ????????????
                            if (element.select) {
                                // console.log("select");
                                // var txt = _input.createTextRange();
                                // txt.select();
                                _input.focus();
                            }
                        } else if (element.type === "select") {
                            const _select_wrap = w.createElement("p");
                            const _select = w.createElement("select");
                            _select.id = element.id;
                            _select.style = "width:100%";
                            element.options.forEach(function (option) {
                                const _option = w.createElement("option");
                                _option.value = option.value;
                                _option.innerHTML = option.text;
                                _select.appendChild(_option);
                            });
                            _select_wrap.appendChild(_select);
                            form.appendChild(_select_wrap);
                        }


                        console.log("element.type" + element.type);


                    });


                    //?????????????????????
                    const _ok = w.createElement("button");
                    _ok.type = "button";
                    _ok.className = "btn btn-s primary";
                    _ok.onclick = function () {
                        return _click(false)
                    };
                    _ok.innerHTML = "??????";


                    const _cancel = w.createElement("button");
                    _cancel.type = "button";
                    _cancel.className = "btn btn-s";
                    _cancel.onclick = function () {
                        return _click(true)
                    };
                    _cancel.innerHTML = "??????";

                    form.appendChild(_ok);
                    form.appendChild(_cancel);

                    w.body.appendChild(dialog)
                }

                function _click(_cancel) {
                    //?????????????????????
                    if (!_cancel) {
                        var ret = getRet()
                        if (dialogContent.callback){
                            ret = dialogContent.callback(content);
                        }
                        console.log(ret);
                        vditor.insertValue(ret, true);
                    }
                    dialog.parentNode.removeChild(dialogBackground);
                    dialog.parentNode.removeChild(dialog);

                }

                //???????????????????????????
                function getRet() {
                    var ret = dialogContent.ret;
                    if (dialogContent.getRetCallback){
                        ret = dialogContent.getRetCallback();
                    }
                    //????????????????????????ajax???????????????ajax?????????
                    const ajax_url = dialogContent.input[0].ajax_url;
                    // console.log("dialogContent.ajax_url" + ajax_url);
                    if (typeof ajax_url != "undefined" && ajax_url !== "") {
                        const callback = $.ajax({
                            type: 'POST',
                            url: ajax_url,
                            data: {
                                data: $('.wmd-prompt-dialog ' + dialogContent.input[0].type).val(),
                                size: "large",
                                autoplay: $("#autoplay").is(':checked')
                            },
                            async: false
                        });
                        ret = callback.responseText;
                    } else {
                        dialogContent.input.forEach(function (element) {
                            const _input_value = w.getElementById(element.id).value;
                            if (dialogContent.elementRetCallback){
                                ret = dialogContent.elementRetCallback(ret,element.id,_input_value);
                            }else{
                                ret = ret.replace(element.id, _input_value);
                            }
                        });
                    }

                    return ret;
                }
            }


            //================== end : typecho ????????????????????? ==================

            var textarea = $('#text').parent();
            var content = $('#text').text();
            console.log(content);
            textarea.prepend("<div id='vditor'></div>");

            const origin_toolbar = ['headings', 'bold', 'italic', 'strike', 'link', '|', 'list', 'ordered-list',
                'check', 'outdent', 'indent', '|', 'quote', 'line', 'code', 'inline-code', '|', 'upload', 'table', '|', 'undo', 'redo', '|', 'export'];
            const custom_toolbar = [
                'fullscreen',
                'outline',
                'both',
                'preview',
                {
                    name: "toHelp",
                    tip: "????????????",
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"> ' +
                        '<path d="M19.652 25v6c0 0.55-0.45 1-1 1h-6c-0.55 0-1-0.45-1-1v-6c0-0.55 0.45-1 1-1h6c0' +
                        '.55 0 1 0.45 1 1zM27.552 10c0 4.75-3.225 6.575-5.6 7.9-1.475 0.85-2.4 2.575-2.4 3.3v0c0 ' +
                        '0.55-0.425 1.2-1 1.2h-6c-0.55 0-0.9-0.85-0.9-1.4v-1.125c0-3.025 3-5.625 5.2-6.625 1' +
                        '.925-0.875 2.725-1.7 2.725-3.3 0-1.4-1.825-2.65-3.85-2.65-1.125 0-2.15 0.35-2.7 0.725-0' +
                        '.6 0.425-1.2 1.025-2.675 2.875-0.2 0.25-0.5 0.4-0.775 0.4-0.225 0-0.425-0.075-0.625-0' +
                        '.2l-4.1-3.125c-0.425-0.325-0.525-0.875-0.25-1.325 2.7-4.475 6.5-6.65 11.6-6.65 5.35 0 11' +
                        '.35 4.275 11.35 10z"></path> </svg>',
                    click: function () {
                        window.open("https://auth.ihewro.com/user/docs/#/preference/vditor")
                    }
                },
                'edit-mode',
                {
                    name: 'more',
                    toolbar: [
                        {
                            name: "insert_iamge",
                            tip: "????????????",
                            icon: "????????????",
                            click: function () {
                                promptDialog(options.strings.imagedialog);
                            }
                        },
                        {
                            name: "insert_word",
                            tip: "????????????????????????",
                            icon: "????????????????????????",
                            click: function () {
                                promptDialog(options.strings.colorWordDialog);
                            }
                        },
                        {
                            name: "insert_music",
                            tip: "????????????",
                            icon: "????????????",
                            click: function () {
                                promptDialog(options.strings.musicdialog);
                            }
                        }, {
                            name: "insert_video",
                            tip: "????????????",
                            icon: "????????????",
                            click: function () {
                                promptDialog(options.strings.videoDialog);
                            }
                        }, {
                            name: "insert_post",
                            tip: "????????????",
                            icon: "????????????",
                            click: function () {
                                promptDialog(options.strings.postDialog);

                            }
                        }, {
                            name: "insert_button",
                            tip: "????????????",
                            icon: "????????????",
                            click: function () {
                                promptDialog(options.strings.buttonDialog);
                            }
                        }, {
                            name: "insert_scode",
                            tip: "??????????????????",
                            icon: "??????????????????",
                            click: function () {
                                promptDialog(options.strings.citeDialog);

                            }
                        }, {
                            name: "insert_collapse",
                            tip: "???????????????",
                            icon: "???????????????",
                            click: function () {
                                promptDialog(options.strings.collapseDialog);

                            }
                        }, {
                            name: "insert_collapse",
                            tip: "??????????????????",
                            icon: "??????????????????",
                            click: function () {
                                vditor.insertValue('[hide]??????????????????????????????????????????[/hide]');

                            }
                        }, {
                            name: "insert_collapse",
                            tip: "??????????????????",
                            icon: "??????????????????",
                            click: function () {
                                vditor.insertValue('[login]??????????????????????????????????????????[/login]');

                            }
                        }, {
                            name: "insert_collapse",
                            tip: "??????tab",
                            icon: "??????tab",
                            click: function () {
                                vditor.insertValue('[tabs]\n' +
                                    '[tab name="????????? 1" active="true"]?????? 1[/tab]\n' +
                                    '[tab name="????????? 2"]?????? 2[/tab]\n' +
                                    '[/tabs]');

                            }
                        }, {
                            name: "insert_collapse",
                            tip: "????????????",
                            icon: "????????????",
                            click: function () {
                                vditor.insertValue('[album type="photos"]\n' +
                                    '[??????????????????????????????markdown?????????html????????????????????????]\n' +
                                    '[/album]');

                            }
                        },
                        {
                            name: "insert_timeline",
                            tip: "???????????????",
                            icon: "???????????????",
                            click: function () {
                                vditor.insertValue('[timeline title="???????????????" type="small"]\n[item date="2020-1-20"] ' +
                                    '????????????????????? [/item]\n[item]??????????????????????????????????????????????????????????????????/??????[/item]\n[item date="2020-2-20"]' +
                                    '????????????????????? [/item]\n[/timeline]');
                            }
                        },
                        {
                            name: "insert_todolist",
                            tip: "???????????????",
                            icon: "???????????????",
                            click: function () {
                                vditor.insertValue('[goal title="?????????"]\n' +
                                    '[item check="true"] ????????????????????????????????????????????????check?????????true?????????????????????false??????????????? [/item]\n' +
                                    '[item progress="50%"] ???????????????????????? [/item]\n' +
                                    '[/goal]');

                            }
                        },
                        {
                            name: "insert_column",
                            tip: "??????????????????",
                            icon: "??????????????????",
                            click: function () {
                                vditor.insertValue('[column]\n' +
                                    '[block] ??????????????? [/block]\n' +
                                    '[block size="20%"]?????????????????????20%[/block]\n' +
                                    '[block size="200px"]?????????????????????200?????? [/block]\n' +
                                    '[/column]');

                            }
                        },
                        'info',
                        'help'
                    ]
                }
            ];


            // console.log(content);
            const vditor = new Vditor('vditor', {
                typewriterMode: true,
                height: 640,
                mode: '<?php echo ($vditorMode == "sv_both") ? "sv" : $vditorMode ?>',
                toolbar: origin_toolbar.concat(custom_toolbar),
                "counter": {
                    "enable": true
                },
                "toolbarConfig": {
                    "pin": false
                },
                cdn: LocalConst.VDITOR_CDN,
                undoDelay: 50,
                cache: {
                    enable: false,
                    id: 'cid_' + $('input[name="cid"]').val()
                },
                value: content,
                after() {
                    // console.log("after")
                    // vditor.clearCache();
                    // vditor.setValue(content);
                },
                upload: {
                    url: uploadURL.replace('CID', $('input[name="cid"]').val()),
                    <?php
                    $config = Typecho_Widget::widget('Widget_Options')->plugin('Handsome');

                    if ($config->urlUpload == "true"):?>
                    linkToImgUrl: uploadURL.replace('CID', $('input[name="cid"]').val()),
                    max: 100 * 1024 * 1024,
                    linkToImgCallback: function (responseText) {
                        console.log(responseText);
                        const ret = JSON.parse(responseText);

                        const file = {};
                        file.id = Math.floor(Math.random() * 1000) + "";
                        const data = ret["data"];
                        file.name = data.title;
                        file.url = data["url"];
                        file.image = true;
                        fileUploadStart(file);
                        fileUploadComplete(file.id, data["url"], data);

                    },
                    <?php endif; ?>
                    filename: function (name) {
                        // console.log("side effect");
                        return name;
                    },
                    format: function (files, responseText) {
                        // console.log(responseText);

                        var data = JSON.parse(responseText);
                        var ret = {};
                        const file = {};
                        file.id = Math.floor(Math.random() * 1000) + "";
                        if (data[0]) {
                            file.name = data[1].title;
                            file.image = true;
                            file.url = data[0];
                            fileUploadStart(file);
                            fileUploadComplete(file.id, data[0], data[1]);
                            ret.msg = "";
                            ret.code = 0;
                            ret.data = {};
                            ret.data.errFiles = [];
                            var fileName = data[1].title;
                            var filePath = data[1].url;
                            // console.log("data[0]_ok,data[1].url,data[1].title" + data[1].url + "|" + data[1].title);
                            var map = {};
                            map[fileName] = filePath;
                            ret.data.succMap = map;
                            // console.log(ret.data.succMap);
                        } else {
                            //??????????????????
                            const error = {};
                            error.file = file;
                            //todo ?????????????????????
                            file.name = "??????????????????";
                            error.code = 404;
                            fileUploadStart(file);
                            fileUploadError(error);
                            console.log("no!!");
                            ret.msg = "";
                            ret.code = 0;
                            ret.data = {};
                            ret.data.errFiles = [];
                            var fileName = "";
                            var filePath = "";
                            ret.data.succMap = {};
                        }
                        // console.log(JSON.stringify(ret));
                        return JSON.stringify(ret);
                    },
                },
                icon: "material",
                "tab": "\t",
                preview: {
                    icon: "material",
                    hljs: {
                        enable: true,
                        style: 'monokai',
                        lineNumber: true
                    },
                    "math": {
                        "engine": "MathJax",
                        "macros": {
                            "bf": "{\\boldsymbol f}",
                            "bu": "{\\boldsymbol u}",
                            "bv": "{\\boldsymbol v}",
                            "bw": "{\\boldsymbol w}"
                        },
                        "inlineDigit": true
                    },
                    <?php if ($vditorMode == "sv"): ?>
                    "mode": "editor"
                    <?php endif; ?>
                }
            });


            // ?????????????????????
            document.getElementById("btn-save").onclick = function () {
                $("#text").val(vditor.getValue());
                // vditor.clearCache();
                submitted = true;

            }


            // ???????????????
            //todo ??????????????????????????????????????????
            if (document.getElementById("btn-preview")){
                document.getElementById("btn-preview").onclick = function () {
                    $("#text").val(vditor.getValue());
                    // vditor.clearCache();
                }
            }

            // ???????????????
            document.getElementById("btn-submit").onclick = function () {
                $("#text").val(vditor.getValue());
                // vditor.clearCache();
                console.log("submit");
                submitted = true;
            };


            // ????????????????????????????????? Thanks to Markxuxiao
            Typecho.insertFileToEditor = function (file, url, isImage) {
                if (isImage) {
                    // console.log("insertFileToEditor,image");
                    options.strings.imagedialog.input[0].value = url;
                    promptDialog(options.strings.imagedialog);
                } else {
                    //????????????
                    // console.log("insertFileToEditor,link");
                    options.strings.linkdialog.input[0].value = url;
                    promptDialog(options.strings.linkdialog);

                }
            };

            $("#vditor").on("click", "button", function (e) {
                e.preventDefault();
                e.stopPropagation();

            });


            $("#upload-panel").append('<ul  class="typecho-option-tabs clearfix"><li id="insert_all_imagee" ' +
                'class="w-100"><a ' +
                'href="#">????????????????????????</a></li><li id="insert_all_no_imagee" class="w-100"><a ' +
                'href="#">???????????????????????????</a></li></ul>');


            $("#insert_all_imagee").on("click", function () {
                var ret = "";
                $("#file-list li").each(function (item) {
                    if ($(this).attr("data-image") === "1") {
                        ret = ret + "![" + $(this).find(".insert").text() + "](" + $(this).attr("data-url") + ")" + "\n";
                    }
                })
                vditor.insertValue(ret);
            })

            $("#insert_all_no_imagee").on("click", function () {
                var ret = "";
                $("#file-list li").each(function (item) {
                    if ($(this).attr("data-image") !== "1") {
                        ret = ret + "[" + $(this).find(".insert").text() + "](" + $(this).attr("data-url") + ")" + "\n";
                    }
                })
                vditor.insertValue(ret);
            })

        });

    </script>
    <?php

}


function choseOther()
{

    ?>

    <style>
        #text {
            display: none;
        }

        #wmd-button-bar {
            display: none;
        }
    </style>

    <?php

}

?>
