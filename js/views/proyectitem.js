var ProyectItemView = Backbone.View.extend({
	template: Handlebars.compile(
    '{{#each models}}' +
    '<p><a class="link" href="{{attributes.url}}">{{attributes.name}}</a>: {{attributes.description}}</p>' +
    '{{/each}}'
	),

  initialize: function() {
		this.listenTo(this.collection, "reset", this.render);
	},

	render: function() {
		this.$el.html(this.template(this.collection));
		return this;
	}
});