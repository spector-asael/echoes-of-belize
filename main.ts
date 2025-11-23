namespace SpriteKind {
    export const DONTUSE = SpriteKind.create()
    export const left_arrow = SpriteKind.create()
    export const bottom_arrow = SpriteKind.create()
    export const top_arrow = SpriteKind.create()
    export const right_arrow = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2_game_ready_flag) {
        if (arrow_list[expected_arrow_index].kind() == SpriteKind.top_arrow) {
            if (!(arrow_list[expected_arrow_index].overlapsWith(top_arrow2))) {
                arrow_list[expected_arrow_index].setImage(assets.image`top-arrow1`)
                miss = sprites.create(assets.image`miss`, SpriteKind.Text)
                miss.setPosition(70, 90)
                miss.setVelocity(0, -10)
                sprites.destroy(miss, effects.fountain, 700)
            }
            if (arrow_list[expected_arrow_index].overlapsWith(top_arrow2)) {
                arrow_list[expected_arrow_index].setImage(assets.image`top-arrow0`)
            }
        } else {
            miss = sprites.create(assets.image`miss`, SpriteKind.Text)
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.bottom_arrow) {
                miss.setPosition(70, 90)
                arrow_list[expected_arrow_index].setImage(assets.image`bottom-arrow0`)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.right_arrow) {
                arrow_list[expected_arrow_index].setImage(assets.image`right-arrow0`)
                miss.setPosition(100, 90)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.left_arrow) {
                arrow_list[expected_arrow_index].setImage(assets.image`left-arrow0`)
                miss.setPosition(30, 90)
            }
            miss.setVelocity(0, -10)
            sprites.destroy(miss, effects.fountain, 700)
        }
    }
    if (expected_arrow_index < arrow_list.length - 1) {
        expected_arrow_index += 1
    }
})
function scene2_game_ready () {
    music.play(music.stringPlayable("- - D - D - E - ", 120), music.PlaybackMode.InBackground)
    pause(1000)
    ready = sprites.create(assets.image`ready`, SpriteKind.Text)
    pause(1000)
    sprites.destroy(ready)
    ready = sprites.create(assets.image`Set`, SpriteKind.Text)
    pause(1000)
    sprites.destroy(ready)
    left_arrow2 = sprites.create(assets.image`left-arrow`, SpriteKind.Projectile)
    right_arrow2 = sprites.create(assets.image`right-arrow`, SpriteKind.Projectile)
    top_arrow2 = sprites.create(assets.image`top-arrow`, SpriteKind.Projectile)
    bottom_arrow2 = sprites.create(assets.image`bottom-arrow`, SpriteKind.Projectile)
    left_arrow2.setPosition(30, 100)
    top_arrow2.setPosition(55, 100)
    bottom_arrow2.setPosition(75, 100)
    right_arrow2.setPosition(100, 100)
    ready = sprites.create(assets.image`go_img`, SpriteKind.Text)
    pause(500)
    sprites.destroy(ready)
    test1()
    pause(1000)
    music.play(music.stringPlayable("D F A B A G F E ", 120), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E G B C B A G F ", 120), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E D C - - - - - ", 120), music.PlaybackMode.UntilDone)
}
function scene1_dialogue () {
    displayDialogue("Hey, Carlos!", 55, 77, 15, 1, 26)
    grandpa_dialogue_1_flag = 1
    scene_1_conversation_flag = 0
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    // Only show next text if not already showing
    if (intro_flag) {
        intro_prologue1()
    }
    if (intro_flag == 0) {
        if (intro_carlos_movement_flag_1 == 1) {
            young_guy.vx = 30
        }
    }
    if (scene_1_conversation_flag == 1) {
        scene1_dialogue()
    }
    if (scene_1_conversation2_flag == 1) {
        scene1_dialogue2()
    }
    if (scene1_dialogue1_movement_flag == 1) {
        scene_1_conversation2_flag = 1
        scene1_dialogue1_movement_flag = 0
    }
    if (grandpa_dialogue_1_flag == 1) {
        young_guy.setImage(assets.image`carlos_looking_left`)
        grandpa_dialogue_1_flag = 0
        scene1_dialogue1_movement_flag = 1
    }
    if (scene_2_state == 1) {
        initialize_scene2()
    }
    if (scene_2_initial_dialogue == 1) {
        sprites.destroy(rhthym_game_boss)
        rhthym_game_boss = sprites.create(assets.image`boss`, SpriteKind.Player)
        rhthym_game_boss.setPosition(75, 86)
        scene2_initialDialogue1()
    }
    if (scene2_game_ready_flag) {
        scene2_game_ready_flag = 0
        scene2_game_ready2_flag = 1
        scene2_test2_init()
    }
    if (scene2_final_dialogue_flag) {
        scene2_final_dialogue2()
    }
})
function displayDialogue (text: string, X: number, Y: number, colorText: number, colorBg: number, length: number) {
    dialogueText = ""
    textSprite = textsprite.create(dialogueText, colorBg, colorText)
    textSprite.setCharsPerLine(length)
    textSprite.setPosition(X, Y)
    speed = 100
    for (let index = 0; index <= text.length - 1; index++) {
        dialogueText = "" + dialogueText + text.charAt(index)
        if (controller.A.isPressed()) {
            speed = 20
        } else {
            speed = 100
        }
        pause(speed)
        textSprite.setText(dialogueText)
    }
    pauseUntil(() => !(controller.A.isPressed()))
    pauseUntil(() => controller.A.isPressed())
    sprites.destroy(textSprite)
}
function scene1_dialogue2 () {
    displayDialogue("What's wrong? ", 55, 77, 15, 1, 26)
    displayDialogue("It's the last  day of school!", 50, 67, 15, 1, 15)
    displayDialogue("You should be excited!", 32, 77, 15, 1, 26)
    scene_1_conversation2_flag = 0
    scene_2_state = 1
}
function test1 () {
    miss_counter = 0
    info.setScore(0)
    arrow_list = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_x = [
    30,
    75,
    55,
    100,
    55,
    55,
    75,
    75,
    75,
    55,
    100,
    30,
    100,
    55,
    55,
    75,
    75,
    30,
    30,
    0,
    0,
    0
    ]
    arrow_y = 60
    expected_arrow_index = 0
    for (let arrow_index2 = 0; arrow_index2 <= 18; arrow_index2++) {
        arrow_y += -33
        arrow_list[arrow_index2].setPosition(arrow_x[arrow_index2], arrow_y)
        arrow_list[arrow_index2].setVelocity(0, 69)
    }
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2_game_ready_flag || scene2_game_ready2_flag) {
        if (arrow_list[expected_arrow_index].kind() == SpriteKind.left_arrow) {
            if (!(arrow_list[expected_arrow_index].overlapsWith(left_arrow2))) {
                arrow_list[expected_arrow_index].setImage(assets.image`left-arrow0`)
                miss = sprites.create(assets.image`miss`, SpriteKind.Text)
                miss.setPosition(25, 90)
                miss.setVelocity(0, -10)
                sprites.destroy(miss, effects.fountain, 700)
            }
            if (arrow_list[expected_arrow_index].overlapsWith(left_arrow2)) {
                arrow_list[expected_arrow_index].setImage(assets.image`left-arrow1`)
            }
        } else {
            miss = sprites.create(assets.image`miss`, SpriteKind.Text)
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.right_arrow) {
                arrow_list[expected_arrow_index].setImage(assets.image`right-arrow0`)
                miss.setPosition(100, 90)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.top_arrow) {
                miss.setPosition(50, 90)
                arrow_list[expected_arrow_index].setImage(assets.image`top-arrow1`)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.bottom_arrow) {
                arrow_list[expected_arrow_index].setImage(assets.image`bottom-arrow0`)
                miss.setPosition(70, 90)
            }
            miss.setVelocity(0, -10)
            sprites.destroy(miss, effects.fountain, 700)
        }
    }
    if (expected_arrow_index < arrow_list.length - 1) {
        expected_arrow_index += 1
    }
})
function test2 () {
    miss_counter = 0
    info.setScore(0)
    arrow_list = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_list2 = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_list3 = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_list4 = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_list5 = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_list6 = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_list7 = [
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`right-arrow`, SpriteKind.right_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`top-arrow`, SpriteKind.top_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`bottom-arrow`, SpriteKind.bottom_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(assets.image`left-arrow`, SpriteKind.left_arrow),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player),
    sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    ]
    arrow_x = [
    30,
    75,
    55,
    100,
    55,
    55,
    75,
    75,
    75,
    55,
    100,
    30,
    100,
    55,
    55,
    75,
    75,
    30,
    30,
    0,
    0,
    0
    ]
    arrow_y = -120
    expected_arrow_index = 0
    for (let arrow_index22 = 0; arrow_index22 <= 18; arrow_index22++) {
        arrow_y += -33
        arrow_list[arrow_index22].setPosition(arrow_x[arrow_index22], arrow_y)
        arrow_list[arrow_index22].setVelocity(0, 300)
    }
    for (let arrow_index23 = 0; arrow_index23 <= 18; arrow_index23++) {
        arrow_y += -33
        arrow_list2[arrow_index23].setPosition(arrow_x[arrow_index23], arrow_y)
        arrow_list2[arrow_index23].setVelocity(0, 300)
    }
    for (let arrow_index24 = 0; arrow_index24 <= 18; arrow_index24++) {
        arrow_y += -33
        arrow_list3[arrow_index24].setPosition(arrow_x[arrow_index24], arrow_y)
        arrow_list3[arrow_index24].setVelocity(0, 300)
    }
    for (let arrow_index25 = 0; arrow_index25 <= 18; arrow_index25++) {
        arrow_y += -33
        arrow_list4[arrow_index25].setPosition(arrow_x[arrow_index25], arrow_y)
        arrow_list4[arrow_index25].setVelocity(0, 300)
    }
    for (let arrow_index26 = 0; arrow_index26 <= 18; arrow_index26++) {
        arrow_y += -33
        arrow_list5[arrow_index26].setPosition(arrow_x[arrow_index26], arrow_y)
        arrow_list5[arrow_index26].setVelocity(0, 300)
    }
    for (let arrow_index27 = 0; arrow_index27 <= 18; arrow_index27++) {
        arrow_y += -33
        arrow_list6[arrow_index27].setPosition(arrow_x[arrow_index27], arrow_y)
        arrow_list6[arrow_index27].setVelocity(0, 300)
    }
    for (let arrow_index28 = 0; arrow_index28 <= 18; arrow_index28++) {
        arrow_y += -33
        arrow_list7[arrow_index28].setPosition(arrow_x[arrow_index28], arrow_y)
        arrow_list7[arrow_index28].setVelocity(0, 300)
    }
}
function scene2_initialDialogue1 () {
    displayDialogue("Hello Jamal, today is the day.", 20, 63, 15, 1, 19)
    displayDialogue("It's time for your evaluation.", 20, 63, 15, 1, 19)
    displayDialogue("We've brought in a new AI model.", 20, 63, 15, 1, 19)
    displayDialogue("And we are going to  test your performancewhen compared to this new AI model", 10, 43, 15, 1, 21)
    displayDialogue("If you can do better than this AI, then you'll keep your job", 4, 56, 15, 1, 26)
    displayDialogue("If not, then unfortunately we'll have to let you go", 3, 63, 15, 1, 26)
    displayDialogue("Sorry... Upper management didn't budge", 2, 63, 15, 1, 26)
    displayDialogue("I tried everything I could.", 2, 73, 15, 1, 27)
    displayDialogue("But they value efficiency above all else.", 5, 63, 15, 1, 26)
    displayDialogue("Do a good job, okay? ", 20, 73, 15, 1, 26)
    displayDialogue("Ready? Then let's begin test 1!", 10, 63, 15, 1, 24)
    scene2_game_ready_flag = 1
    scene_2_initial_dialogue = 0
    scene2_game_ready()
}
function intro_prologue1 () {
    game.showLongText("The year is 2080", DialogLayout.Bottom)
    game.showLongText("Belize has become a hyper-automized society", DialogLayout.Bottom)
    game.showLongText("Carlos has just finished his last day of highschool", DialogLayout.Bottom)
    game.showLongText("He should be excited! but... something lingers in his mind", DialogLayout.Bottom)
    intro_flag = 0
}
function initialize_scene1 () {
    old_guy = sprites.create(img`
        . . . . f f f f f f . . . . . . 
        . . . f a f b b b b f f . . . . 
        . . f a a a f b b b b f f . . . 
        . . f b b b b f f b b b f . . . 
        . f b a a a a b b f f f f . . . 
        . f a b f f f f a a a b f . . . 
        . f f f b b b f f f f f f f . . 
        . f b b b b f b b b b b f f . . 
        . . f b d d f 1 b d b b b f . . 
        . . . f d d d d b b b b f . . . 
        . . . f b b b b b b f f . . . . 
        . . . f a a a c d d c . . . . . 
        . . . f a a a c d d c . . . . . 
        . . . f 5 5 c f c c f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . f f f . . . . . . . 
        `, SpriteKind.Player)
    old_guy.setPosition(90, 92)
    // Sprite: Young guy entering from left
    young_guy = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f . . . . . 
        . . . f f e e e e f 2 f . . . . 
        . . f f e e e e f 2 2 2 f . . . 
        . . f e e e f f e e e e f . . . 
        . . f f f f e e 2 2 2 2 e f . . 
        . . f e 2 2 2 f f f f e 2 f . . 
        . f f f f f f f e e e f f f . . 
        . f f e 4 4 e b f 4 4 e e f . . 
        . f e e 4 d 4 1 f d d e f . . . 
        . . f e e e e e d d d f . . . . 
        . . . . f 4 d d e 4 e f . . . . 
        . . . . f e d d e 2 2 f . . . . 
        . . . f f f e e f 5 5 f f . . . 
        . . . f f f f f f f f f f . . . 
        . . . . f f . . . f f f . . . . 
        `, SpriteKind.Player)
    young_guy.setPosition(-20, 92)
    intro_flag = 1
    intro_carlos_movement_flag_1 = 1
    // Set the background to a simple house interior (pixel art)
    scene.setBackgroundImage(img`
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b888886888888588888888888888b8888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b888886888888588888888888888b8888888888888
        8888888888888888888888888888888888688888888888b88888888888888888888888888888888888888888888888888888888888888888888888b888888688888588888888888888b8888888888888
        888888888888888888888888888888888868888888888888888888888888888888888888888888888888888888b888888888888888888888888888b888888688888588888888888888b8888888888888
        888888888888888888888888888888888868888888888b888888888888888888888888888888888888888888888888888888888888888888888888b888888888888588888888888888b8888888888888
        88888888888888888888888888888888886888888888b8888888888888888888888888888888888888888888888b88888888888888888888888888b888888868888588888888888888b8888888888888
        8888888888888888888888888888888888688888888b88888888888888888888888888888888888888888888888888888888888888888888888888b888888868888588888888888888b8888888888888
        88888888888888888888888888888888868888888888888888888888888888888888888888888888888888888888b8888888888888888888888888b888888868888588888888888888b8888888888888
        888888888888888888888888888888888688888888b88888888888888888888888888888888888888888888888888b888888888888888888888888b888888886888588888888888888b8888888888888
        88888888888888888888888888888888868888888b888888888888888888888888888888888888888888888888888b888888888888888888888888b888888886888588888888888888b8888888888888
        8888888888888888888888888888888868888888b88888888888888888888888888888888888888888888888888888b88888888888888888888888b888888886888588888888888888b8888888888888
        88888888888888888888888888888888688888bb8888888888888888888888888888888888888888888888888888888b8888888888888888888888b88888888868858888888888888858888888888888
        8888888888888888888888888888888868888bb88888888888888888888888888888888888888888888888888888888b8888888888888888888888b888888888688588888888888888b8888888888888
        888888888888888888888888888888886888bb8888888888888888888888888888888888888888888888888888888888b888888888888888888888b888888888688588888888888888b8888888888888
        88888888888888888888888888888888688b888888888888888888888888888888888888888888888888888888888888bb88888888888888888888b888888888668588888888888888b8888888888888
        8888888888888888888888888888888688b88888888888888888888888888888888888888888888888888888888888888bb8888888888888888888b88888888886858888888888888858888888888888
        88888888888888888888888888888886bb8888888888888888888888888888888888888888888888888888888888888888b8888888888888888888b888888888868b88888888888888b8888888888888
        88888888888888888888888888888886b888888888888888888888888888888888888888888888888888888888888886888b888888888888888888b888888888855b55888888888888b8888888888888
        8888888888888888888888888888886b88888888888888888888888888888888888888888888888888888888888888868888b88888888888888888b88888888555b5b555888888888858888888888888
        8888888888888888888888888888bb68888888888888888888888888888888888888888888888888888888888888888888888b888888888888888858888b88bbbb555bbbbb8b888888b8888888888888
        888888888888888888888888888bb85b8888888888888888888888888888888888888888888888888888888888888888688888b888888888888888b88885555bbb5555bbb55588888858888888888888
        88888888888888888888888888b8865588888888888888888888888888888888888888888888888888888888888888886888888bb8888888888888b8888b555555555555555b88888858888888888888
        888888888888888888888888bb555555b88888888888888888888888888888888888888888888888888888888888888888888888bb888888888888b88888bbb8b86688b88bb888888858888888888888
        88888888888888888888888bb8b55555555b888888888888888888888888888888888888888888888888888888888888868888888bb88888888888588888b5855586855585b888888858888888888888
        888888888888888888888bb88885555555b888888888888888888888888888888888888888888888888888888888888886888888888b8888888888b88888858b5b868b5b858888888858888888888888
        88888888888888888888b888888b55555b88888888888888888888888888888888888888888888888888888888888888886888888888bb88888888b88888858858868858858888888858888888888888
        888888888888888888bb8888888b55555b888888888888888888888888888888888888888888888888888888888888888868888888888bb8888888588888858858866858858888888858888888888888
        8888888888888888bb888888888555b55588888888888888888888888888888888888888888888888888888888888888886888888888888bb88888b88888858858886858858888888858888888888888
        888888888888888bb888888888855888558888888888888888888888888888888888888888888888888888888888888888868888888888888bb888588888858858886858858888888858888888888888
        8888888888888bb8888888888866888888888888888888888888888888888888888888888888888888888888888888888886888888888888888bb8588888858858886658858888888858888888888888
        8888888888bbb88888888888886888888888888888888888888888888888888888888888888888888888888888888888888868888888888888888b5b8888858858886658858888888858888888888888
        888888888b8888888888888888688888888888888888888888888888888888888888888888888888888888888888888888886688888888888888885bbb88858858888658858888888858888888888888
        88888888bb888888888888888688888888888888888888888888888888888888888888888888888888888888888888888888868888888888888888588bbbb58858888658858888888858888888888888
        888888bb88888888888888888688888888888888888888888888888888888888888888888888888888888888888888888888866888888888888888588888b5bb58888658858888888858888888888888
        8888bb8888888888888888886888888888888888888888888888888888888888888888888888888888888888888888888888886888888888888888588888858b5bbb8658858888888858888888888888
        bbbb8888888888888888888868888888888888888888888888888888888888888888888888888888888888888888888888888866888888888888885888888588588bbb5b858888888858888888888888
        888888888888888888888886688888888888888888888888888888888888888888888888888888888888888888888888888888866888888888888858888885b858888856b5bbb8888858888888888888
        8888888888888888888888868888888888888888888888888888888888888888888888888888888888888888888888888888888866888888888888588888855b5888885b5588bbbbb858888888888888
        88888888888888888888888688888888888888888888888888888888888888888888888888888888888888888888888888888888668888888888885888888b55555555555b888888885bbbbbbb888888
        88888888888888888888888688888888888888888888888888888888888888888888888888888888888888888888888888888888866888888888885888888855555555555888888888b88888bbbbbbbb
        8888888888888888888888688888888888888888888888888888888888888888888888888888888888888888888888888888888888668888888888588888888b55bbb55b6888888855b5588888888888
        8888888888888888888886888888888888888888888888888888888888888888888888888888888888888888888888888888888888866888888888588888888888555888688888555b5b555888888888
        8888888888888888888868888888888888888888888888888888888888888888888888888888888888888888888888888888888888886688888888588888888888b5b88866b88bbbb555bbbbb8b88888
        8888888888888888888668888888888888888888888888888888888888888888888888888888888888888888888888888888888888888668888888588888888888bbb888665555bbb5555bbb55588888
        888888888888888888868888888888888888888888888888888888888888888888888888888888888888888888888888888888888888866688888858888888888855588886b555555555555555b88888
        8888888888888888886888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888866688888588888888888b5b888866bbb8b88888b88bb888888
        8888888888888888866888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888886668888588888888888858888886b5855588855585b888888
        8888888888888888868888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888666888b88888888888858888886658b5b888b5b858888888
        8888888888888888688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888886655b55888888888858888886658858888858858888888
        888888888888888668888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888555b5b5558888888858888888658858888858858888888
        88888888888888668888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b88bbbb555bbbbb8b888858888888658858888858858888888
        888888888888886888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885555bbb5555bbb555888858888888858858888858858888888
        88888888888886888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b555555555555555b888858888888856858888858858888888
        888888888888688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888bbb8b88886b68bb88888b8888888856658888858858888888
        888888888886688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b5855588855565b88888b8888888858658888858858888888
        888888888866888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888858b5b888b5b65688888b8888888858658888858858888888
        88888888668888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885885888885885666888b8888888858858888858858888888
        8888888668888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588586666888888888858856888858858888888
        8888886688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588886666888888858856688858858888888
        888866888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888858858888858858888886666888885b858688858b58888888
        8866888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588888888666666855b5866885b558888888
        66888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885885888885885888888888886666b55555555555b8888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588888888888888865555555555588888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588888888888888888b55bbb55b888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588888888888888888888555868888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588888888888888888888b5b866888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588588888588588888888888888888888bbb886688888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885b858888858b588888888888888888888555888868888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855b5888885b5588888888888888888888b5b888886688888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b55555555555b88888888888888888888858888888668888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855555555555888888888888888888888858888888866888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b55bbb55b8888888888888888888888858888888888668
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885558888888888888888888888888858888888888866
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b5b8888888888888888888888888858888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888bbb8888888888888888888888888858888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885558888888888888888888888888858888888888888
        888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b5b88888888888888888888888888b8888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885888888888888888888888888888b8888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885888888888888888888888888888b8888888888888
        88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885888888888888888888888888888b8888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b88888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b88888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b88888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888b88888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888868888888888
        8888888688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888866888888888
        8888886668888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888666668888888
        8888888688888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888886666688888888
        8888888888888888888858888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888666688888888
        8888888888888888888555888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888666688888888
        8888888888888888888858888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888688688888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888858888888885888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888555888888885888888
        8888858888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888858888888855588888
        8888555888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855588888
        8888858888888888888888888888888588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855555555588
        8888888888888868888888888888888558888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888885555555888
        8888888888888858888888888888885555588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888555558888
        8888888888885555588888888888855555888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888558558888
        8888888888888555888888888888885555888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588858888
        8888888888888585888888888888888585888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888858888888888888888888888888
        8888888888888888888888888888888588888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888858888888888888888888888888
        8888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888555888888888888888888888888
        8888888888888888888888858888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888555888888888888888888888888
        8888888888888888888888858888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888555555555888888588888888888888
        8888888888888888888888555888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855555558888888588888888888888
        8888888886888888888888555888888888888888888888888588888888888888888888888888888888888888888888888888888888888888888888888888888888885555588888885558888888888888
        8888888885888888888555555555888888888888888888888588888888888888888888888888888888888888888888888888888888888888888888888888888888885585588888885558888888888888
        8888888555558888888855555558888888888888888888885558888888888888888888888888888888888888888888888888888888888888888888888888888888885888588888855555888888888888
        8888888855588888888885555588888888888888888888885558888888888888888888888888888888888888888888888888888888888888888888888888888888888888888855555555555888888888
        8888888858588888888885585588888888888888888885555555558888888888888888888888888888888888888888888888888888888888888888888885888888888888888885555555558888888888
        8888888888888858888885888588888888888888888888555555588888888888888888888888888888888888888888888888888888888888888888888855588888888888888888855555888888888888
        8888888888888555888888888888888888888888888888855555888888888888888888888888888888888888888888888888888888888888888888888885888888888888888888555855588888888888
        8888888888855555558888888888888888888888888888855855888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888558885588885888888
        8888888888885555588888888888885888888888888888858885888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888588888588855588888
        `)
}
function scene2_test2_init () {
    displayDialogue("Great. Now for test 2.", 19, 63, 15, 1, 22)
    displayDialogue("Goodluck...", 20, 63, 15, 1, 19)
    music.play(music.stringPlayable("- - D - D - E - ", 120), music.PlaybackMode.InBackground)
    pause(1000)
    ready = sprites.create(assets.image`ready`, SpriteKind.Text)
    pause(1000)
    sprites.destroy(ready)
    ready = sprites.create(assets.image`Set`, SpriteKind.Text)
    pause(1000)
    sprites.destroy(ready)
    ready = sprites.create(assets.image`go_img`, SpriteKind.Text)
    left_arrow2 = sprites.create(assets.image`left-arrow`, SpriteKind.Projectile)
    right_arrow2 = sprites.create(assets.image`right-arrow`, SpriteKind.Projectile)
    top_arrow2 = sprites.create(assets.image`top-arrow`, SpriteKind.Projectile)
    bottom_arrow2 = sprites.create(assets.image`bottom-arrow`, SpriteKind.Projectile)
    left_arrow2.setPosition(30, 100)
    top_arrow2.setPosition(55, 100)
    bottom_arrow2.setPosition(75, 100)
    right_arrow2.setPosition(100, 100)
    pause(500)
    sprites.destroy(ready)
    test2()
    pause(1000)
    music.play(music.stringPlayable("A G F E D C B A ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G A C F B D E G ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C E G B A F D C ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("F D A G C B E F ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("B A G D F C E B ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G C A F E B D G ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("D F B A C G E D ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("A E C G B F D A ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C B D A G F E C ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("F G A C E D B F ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("E C F B D A G E ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("G F D B A C E G ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("A D G C F B E A ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("B E A D G C F B ", 500), music.PlaybackMode.UntilDone)
    music.play(music.stringPlayable("C G E A F D B C ", 500), music.PlaybackMode.UntilDone)
    scene2_final_dialogue_flag = 1
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2_game_ready_flag) {
        if (arrow_list[expected_arrow_index].kind() == SpriteKind.right_arrow) {
            if (!(arrow_list[expected_arrow_index].overlapsWith(right_arrow2))) {
                arrow_list[expected_arrow_index].setImage(assets.image`right-arrow0`)
                miss = sprites.create(assets.image`miss`, SpriteKind.Text)
                miss.setPosition(50, 90)
                miss.setVelocity(0, -10)
                sprites.destroy(miss, effects.fountain, 700)
            }
            if (arrow_list[expected_arrow_index].overlapsWith(right_arrow2)) {
                arrow_list[expected_arrow_index].setImage(assets.image`right-arrow1`)
            }
        } else {
            miss = sprites.create(assets.image`miss`, SpriteKind.Text)
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.left_arrow) {
                miss.setPosition(30, 90)
                arrow_list[expected_arrow_index].setImage(assets.image`left-arrow0`)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.top_arrow) {
                miss.setPosition(50, 90)
                arrow_list[expected_arrow_index].setImage(assets.image`top-arrow1`)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.bottom_arrow) {
                arrow_list[expected_arrow_index].setImage(assets.image`bottom-arrow0`)
                miss.setPosition(70, 90)
            }
            miss.setVelocity(0, -10)
            sprites.destroy(miss, effects.fountain, 700)
        }
    }
    if (expected_arrow_index < arrow_list.length - 1) {
        expected_arrow_index += 1
    }
})
function scene2_final_dialogue2 () {
    displayDialogue("We're sorry Jamal.", 20, 73, 15, 1, 19)
    displayDialogue("But unfortunately...", 20, 73, 15, 1, 20)
    displayDialogue("The AI seems to have surpassed you.", 20, 63, 15, 1, 19)
    displayDialogue("We're going to have to let you go.", 20, 63, 15, 1, 19)
    scene2_final_dialogue_flag = 0
    scene3_start_flag = 1
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene2_game_ready_flag) {
        if (arrow_list[expected_arrow_index].kind() == SpriteKind.bottom_arrow) {
            if (!(arrow_list[expected_arrow_index].overlapsWith(bottom_arrow2))) {
                arrow_list[expected_arrow_index].setImage(assets.image`bottom-arrow0`)
                miss = sprites.create(assets.image`miss`, SpriteKind.Text)
                miss.setPosition(100, 90)
                miss.setVelocity(0, -10)
                sprites.destroy(miss, effects.fountain, 700)
            }
            if (arrow_list[expected_arrow_index].overlapsWith(bottom_arrow2)) {
                arrow_list[expected_arrow_index].setImage(assets.image`bottom-arrow1`)
            }
        } else {
            miss = sprites.create(assets.image`miss`, SpriteKind.Text)
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.left_arrow) {
                miss.setPosition(30, 90)
                arrow_list[expected_arrow_index].setImage(assets.image`left-arrow0`)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.top_arrow) {
                arrow_list[expected_arrow_index].setImage(assets.image`top-arrow1`)
                miss.setPosition(50, 90)
            }
            if (arrow_list[expected_arrow_index].kind() == SpriteKind.right_arrow) {
                miss.setPosition(100, 90)
                arrow_list[expected_arrow_index].setImage(assets.image`right-arrow0`)
            }
            miss.setVelocity(0, -10)
            sprites.destroy(miss, effects.fountain, 700)
        }
        if (expected_arrow_index < arrow_list.length - 1) {
            expected_arrow_index += 1
        }
    }
})
function initialize_scene2 () {
    scene.setBackgroundImage(assets.image`warehouse_background`)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    rhthym_game_boss = sprites.create(assets.image`boss`, SpriteKind.Player)
    rhthym_game_player = sprites.create(assets.image`jamal`, SpriteKind.Player)
    rhtyhm_game_opponent = sprites.create(assets.image`ai`, SpriteKind.Player)
    rhthym_game_boss.setPosition(75, 86)
    rhthym_game_player.setPosition(40, 100)
    rhtyhm_game_opponent.setPosition(120, 100)
    scene_2_state = 0
    scene_2_initial_dialogue = 1
}
let rhtyhm_game_opponent: Sprite = null
let rhthym_game_player: Sprite = null
let scene3_start_flag = 0
let old_guy: Sprite = null
let arrow_list7: Sprite[] = []
let arrow_list6: Sprite[] = []
let arrow_list5: Sprite[] = []
let arrow_list4: Sprite[] = []
let arrow_list3: Sprite[] = []
let arrow_list2: Sprite[] = []
let arrow_y = 0
let arrow_x: number[] = []
let miss_counter = 0
let speed = 0
let textSprite: TextSprite = null
let dialogueText = ""
let scene2_final_dialogue_flag = 0
let scene2_game_ready2_flag = 0
let rhthym_game_boss: Sprite = null
let scene_2_initial_dialogue = 0
let scene_2_state = 0
let scene1_dialogue1_movement_flag = 0
let scene_1_conversation2_flag = 0
let young_guy: Sprite = null
let intro_carlos_movement_flag_1 = 0
let intro_flag = 0
let scene_1_conversation_flag = 0
let grandpa_dialogue_1_flag = 0
let bottom_arrow2: Sprite = null
let right_arrow2: Sprite = null
let left_arrow2: Sprite = null
let ready: Sprite = null
let miss: Sprite = null
let top_arrow2: Sprite = null
let expected_arrow_index = 0
let arrow_list: Sprite[] = []
let scene2_game_ready_flag = 0
initialize_scene1()
game.onUpdate(function () {
    // Only show next text if not already showing
    if (intro_carlos_movement_flag_1) {
        if (young_guy.x > 50) {
            young_guy.vx = 0
            young_guy.setImage(assets.image`carlos_looking_right`)
            intro_carlos_movement_flag_1 = 0
            scene_1_conversation_flag = 1
        }
    }
})
