window.onload = function () {
    var tree = $find("<%= RadTreeView1.ClientID %>");
    if (tree != null) {
        var nodes = tree.get_allNodes();

        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (node.get_category() == "Disabled") {
                node.get_textElement().parentElement.className += " rtDisabled";
            }
        }
    }
}