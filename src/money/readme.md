# Documentation
## Data stored in disk
### money.json:
```
{
    currentBalance: number,
    isoData: [
        {
            type: String,
            description: String,
            cost: number (positive = earned; negative = spent)
        },
        {repeat of above}
    ],
    repeat of isoDate
}
```

### type.json
```
{
    type: {
        title: String,
        color: String (HEX_COLOR),
    }
}
```