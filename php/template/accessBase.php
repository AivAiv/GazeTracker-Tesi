<!DOCTYPE html>
<html lang="it">
    <head>
        <title><?php echo $templateParams["title"]; ?></title>
        <?php
            if(isset($templateParams["css"])):
                foreach($templateParams["css"] as $style):
		?>
			<link rel="stylesheet" type="text/css" href="<?php echo $style; ?>.css"/>
		<?php
                endforeach;
            endif;
		?>
        <meta charset="UTF-8"/>
    </head>
    <body>
        <main>
            <?php
                if(isset($templateParams["pageName"])) {
                    require($templateParams["pageName"]);
                }
            ?>
        </main>
		<?php
            if(isset($templateParams["js"])):
                foreach($templateParams["js"] as $script):
		?>
		    <script src="<?php echo $script; ?>"></script>
		<?php
                endforeach;
            endif;
		?>
    </body>
</html>