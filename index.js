require('dotenv').config();
const { 
    Bot, 
    GrammyError, 
    HttpError, 
    InlineKeyboard 
} = require('grammy');

const {hydrate} = require('@grammyjs/hydrate');

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());


bot.api.setMyCommands ([
    {
        command: 'start', 
        description: 'Запуск бота'
    },
    {
        command: 'menu', 
        description: 'Меню бота'
    }
]);

bot.command('start', async (ctx) => {
const inlineKeyboard = new InlineKeyboard()


await ctx.reply('Привет, я бот который поможет определиться с тем что приготовить, выбери - завтрак, обед или ужин?', {
    reply_markup:menuKeyboard
});
});

const menuKeyboard = new InlineKeyboard()
.text('Завтрак', 'breakfast')
.text('Обед', 'lunch')
.text('Ужин', 'dinner');

const breakfastKeyboard = new InlineKeyboard()
.text('Яйца', 'eggs').row()
.text('Творог', 'cottage').row()
.text('Хлеб', 'bread').row()
.text('Мука', 'flour').row()
.text('Случайный рецепт', 'randombreakfast')
.text('< Назад в меню', 'back');

const eggBreakfastKeyboard = new InlineKeyboard()
.text('Омлет', 'Omelette').row()
.text('Яйца с помидорами', 'eggsWithTommato').row()
.text('Вареные яйца', 'boiledEggs').row()
.text('Яичница', 'friedEggs').row()
.text('Яичный блинчик', 'pancakeEggs').row()
.text('< Назад в меню', 'back');

 const backKeyboard = new InlineKeyboard()
 .text('< Назад в меню', 'back');

bot.command('menu', async (ctx) => {
 await ctx.reply('Выберете пункт меню' , {
    reply_markup: menuKeyboard,
 });
 await ctx.answerCallbackQuery();
});
//Завтрак
bot.callbackQuery('breakfast', async (ctx) => {
 await ctx.callbackQuery.message.editText('Выбери подходящую основу для завтрака', {
 reply_markup: breakfastKeyboard,
 });
 await ctx.answerCallbackQuery();
});

bot.callbackQuery('eggs', async (ctx) => {
    await ctx.callbackQuery.message.editText('ммм сегодян ты решил вдарить чего то яичного, ну чтож, выбирай', {
    reply_markup: eggBreakfastKeyboard,
    });
    await ctx.answerCallbackQuery();
   });
//Обед
   bot.callbackQuery('lunch', async (ctx) => {
    await ctx.callbackQuery.message.editText('Тут пока нет ничего, вернись назад', {
    reply_markup: backKeyboard,
    });
    await ctx.answerCallbackQuery();
   });

bot.callbackQuery('back', async (ctx) => {
    await ctx.callbackQuery.message.editText('Выберете пункт меню' , {
       reply_markup: menuKeyboard,
    });
    await ctx.answerCallbackQuery();
   });
// bot.callbackQuery ('btn1' , async (ctx) => {
// const inlineKeyboard = new InlineKeyboard()
// .text('Омлет', 'omlet').row()
// .text('Творог', 'tworog')npm
// .text('Оладушки', 'oladii').row()
// .text('Блинчики', 'bliny').row()
// .text('Сырники', 'sirnyk')
// .text('Тосты', 'tost')
// .text('Назад', 'start');

//     await ctx.answerCallbackQuery()
//     await ctx.reply('Окей, вот варианты завтрака', {
//         reply_markup:inlineKeyboard
//     });
    
// });

// bot.callbackQuery ('btn2' , async (ctx) => {
//     const inlineKeyboard = new InlineKeyboard()
//     .text('обед1', 'obed1').row()
//     .text('обед2', 'obed2')
//     .text('обед3', 'obed3').row()
//     .text('обед4', 'obed4').row()
//     .text('обед5', 'obed5')
//     .text('Назад', 'start');
    
//         await ctx.answerCallbackQuery()
//         await ctx.reply('Окей, вот варианты обеда', {
//             reply_markup:inlineKeyboard
//         });
        
//     });


bot.catch((err) => {
 const ctx = err.ctx;
 console.error(`Error while handling update ${ctx.update.update_id}:`);
 const e = err.error;

 if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
 } else if (e instanceof HttpError) {
    console.error("Could not contact Telegtam:", e);
 } else {
    console.error("Unknown error:", e);
 }
});

bot.start();