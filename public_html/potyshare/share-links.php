<?php
$PY = $_GET['year'];
if (preg_match("/\b[0-9]{4}\b/", $PY)) {
  $potyyear = htmlspecialchars($PY);
} else {
   echo "<h1>Error: No year detected. Please set &year= parameter in the URL.</h1>";
}
if ( $PY == "2018") {
  $potyyearedition = "thirteenth";
}
else if ( $PY == "2019") {
  $potyyearedition = "fourteenth";
}
else  {
  $potyyearedition = "new";
}
?>

<!DOCTYPE html>
<html>

<head>
  <title>POTY <?php echo $potyyear;?> SHARE LINKS</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
<style>
ul.share-buttons{
  list-style: none;
  padding: 0;
}

ul.share-buttons li{
  display: inline;
}

ul.share-buttons .sr-only{
  position: absolute;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
}
#contents {

}
</style>
</head>
</body>

<div id="contents" style="padding:5px;  background: #ffffee; border-bottom: #E7AD00 1px;; border-right: #E7AD00 1px; border-left: #E7AD00 1px; border-top: #E7AD00 9px; border-style: solid; margin-bottom: 2px; padding-top: 3px; text-align:center">
<h1><?php echo $potyyear;?> Picture of the Year | SHARE
</h1>
<ul class="share-buttons">
  <li><a href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&quote=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>" title="Share on Facebook" target="_blank"><img alt="Share on Facebook" src="images/simple_icons_black/Facebook.png" /></a></li>
  <li><a href="https://twitter.com/intent/tweet?source=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&text=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>:%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&via=WikiCommons" target="_blank" title="Tweet"><img alt="Tweet" src="images/simple_icons_black/Twitter.png" /></a></li>
  <li><a href="http://www.tumblr.com/share?v=3&u=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&quote=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>&s=" target="_blank" title="Post to Tumblr"><img alt="Post to Tumblr" src="images/simple_icons_black/Tumblr.png" /></a></li>
  <li><a href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&description=Discover%20the%20<?php echo $potyyearedition; ?>%20edition%20of%20the%20Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>%0A%20contest!%20View%20this%20year's%20top%20pictures%20at%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>" target="_blank" title="Pin it"><img alt="Pin it" src="images/simple_icons_black/Pinterest.png" /></a></li>
  <li><a href="https://getpocket.com/save?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&title=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>" target="_blank" title="Add to Pocket"><img alt="Add to Pocket" src="images/simple_icons_black/Pocket.png" /></a></li>
  <li><a href="http://www.reddit.com/submit?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&title=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>" target="_blank" title="Submit to Reddit"><img alt="Submit to Reddit" src="images/simple_icons_black/Reddit.png" /></a></li>
  <li><a href="http://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&title=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>&summary=Discover%20the%20<?php echo $potyyearedition; ?>%20edition%20of%20the%20Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>%0A%20contest!%20View%20this%20year's%20top%20pictures%20at%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&source=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>" target="_blank" title="Share on LinkedIn"><img alt="Share on LinkedIn" src="images/simple_icons_black/LinkedIn.png" /></a></li>
  <li><a href="http://wordpress.com/press-this.php?u=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&quote=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>&s=Discover%20the%20<?php echo $potyyearedition; ?>%20edition%20of%20the%20Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>%0A%20contest!%20View%20this%20year's%20top%20pictures%20at%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>" target="_blank" title="Publish on WordPress"><img alt="Publish on WordPress" src="images/simple_icons_black/Wordpress.png" /></a></li>
  <li><a href="https://pinboard.in/popup_login/?url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>&title=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>&description=Discover%20the%20<?php echo $potyyearedition; ?>%20edition%20of%20the%20Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>%0A%20contest!%20View%20this%20year's%20top%20pictures%20at%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>" target="_blank" title="Save to Pinboard"><img alt="Save to Pinboard" src="images/simple_icons_black/Pinboard.png" /></a></li>
  <li><a href="mailto:?subject=Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>&body=Discover%20the%20<?php echo $potyyearedition; ?>%20edition%20of%20the%20Wikimedia%20Commons%20Picture%20of%20the%20Year%20<?php echo $potyyear;?>%0A%20contest!%20View%20this%20year's%20top%20pictures%20at%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>:%20https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FCommons%3APicture_of_the_Year%2F<?php echo $potyyear;?>" target="_blank" title="Send email"><img alt="Send email" src="images/simple_icons_black/Email.png" /></a></li>
</ul>
<hr style="color: #E7AD00;">
<a href="https://commons.wikimedia.org/wiki/Commons:POTY/<?php echo $potyyear;?>" class="mw-redirect" title="Commons:POTY/<?php echo $potyyear;?>">POTY START PAGE</a> - <a href="" class="mw-redirect" onclick="window.history.go(-1); return false;">BACK</a>
</div>
</body>
</html>
