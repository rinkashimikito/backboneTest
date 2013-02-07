var Item = Backbone.Model.extend({
  defaults: { 
    itemLink: "defaultLink", itemClass: "defaultBg", itemUrl: "#defaultUrl"
  }
});

var Blocks = Backbone.Collection.extend({
  model: Item
});

var blocks = [
  { itemLink: "ABC", itemClass: "orangeDarkBg tickIco", itemUrl: "#" },
  { itemLink: "ASD", itemClass: "orangeLightBg tickIco", itemUrl: "#" },
  { itemLink: "QWE", itemClass: "blueDarkBg handIco", itemUrl: "#" },
  { itemLink: "DSA", itemClass: "blueLightBg handIco", itemUrl: "#" },
  { itemLink: "ZXC", itemClass: "greenDarkBg moneyIco", itemUrl: "#" }
];

var blockCollection = new Blocks(blocks);

var HeaderView = Backbone.View.extend({
  el: $('.box'),
  events: {
    'click .info': 'slideD',
    'click': 'closeMe'
  },
  slideD: function(e){
    e.preventDefault();
    e.stopPropagation();
    $(e.target).parent().next().slideToggle();
  },
  closeMe: function(e){
    if(!$(e.target).parents('.note').length && !$(e.target).is('.note')) $('.note').slideUp();
  }
});

var ItemView = Backbone.View.extend({
  tagName: "li",
  template: document.getElementById("itemTemplate").innerHTML,

  render: function() {
    var templ = _.template(this.template);
    this.$el.html(templ(this.model.toJSON()));
    return this;
  }
});

var BlockCollectionView = Backbone.View.extend({
  el: $("#itemList"),
  initialize: function() {
    this.collection = blockCollection;
    this.render();
  },
  render: function() {
    this.collection.each(function(item) {
      var itemView = new ItemView({ model: item });
      this.$el.append(itemView.render().el);
    }, this);
  }
});

var head = new HeaderView();
var cart = new BlockCollectionView();