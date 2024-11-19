<!DOCTYPE html>
<html lang="it">
    <head>
        <title><?php echo $templateParams["title"]; ?></title>
        <?php
            if(isset($templateParams["css"])):
                foreach($templateParams["css"] as $style):
		?>
			<link rel="stylesheet" type="text/css" href="../../css/<?php echo $style; ?>.css"/>
		<?php
		    	endforeach;
		    endif;
		?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta charset="UTF-8"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=close" />
    </head>
    <body>
        <nav>
            <h1>GazeTracker</h1>
            <section>
               <?php if(isset($templateParams["navigationButtons"]) && $templateParams["navigationButtons"]["logout"]): ?>
                   <button id="btnLogout">Logout</button>
               <?php endif; ?>
               <?php if(isset($templateParams["navigationButtons"]) && $templateParams["navigationButtons"]["home"]): ?>
                   <button id="btnHome">Home</button>
               <?php endif; ?>
               <?php if(isset($templateParams["navigationButtons"]) && $templateParams["navigationButtons"]["backward"]): ?>
                   <button id="btnBackward"><</button>
               <?php endif; ?>
               <?php if(isset($templateParams["navigationButtons"]) && $templateParams["navigationButtons"]["forward"]): ?>
                   <button id="btnForward">></button>
               <?php endif; ?>
            </section> 
        </nav>
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