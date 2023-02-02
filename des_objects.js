const restaurant = {
    name: 'Thanh Vân Quán',
    location: 'Hanoi',
    categories: ['Italian', 'Pizzeria', 'Mon Chay'],
    staterMenu: ['Foccacia', 'Bruschetta', 'Garlic Bread', 'Salad'],
    mainMenu: ['Pizza', 'Pasta', 'Risotto'],

    openingHours: {
        thu: {
            open: 12,
            close: 22,
        },
        fri: {
            open: 11,
            close: 23,
        },
        sat: {
            open: 0,
            close: 24,
        },
    },

    order: function(starterIndex, mainIndex) {
        return [this.staterMenu[starterIndex], this.mainMenu[mainIndex]];
    },
};
