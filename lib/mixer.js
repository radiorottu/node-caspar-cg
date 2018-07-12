module.exports = function (ccg) {
	var sendMixerCommand = function (self, cmd, channel, options, cb) {

		if (typeof(channel) != "string" || !/[0-9]+-[0-9]+/.test(channel)) {
			self.log("Invalid channel");
			return
		}
		s_cmd = "MIXER " + channel + " " + cmd + " ";

		if (typeof(cb) != "function") cb = false;

		s_cmd += options;

		self.sendCommand(s_cmd, cb);
	};

	// ---
	// ccg.mixer_fill
	// ---
	// Scales the video stream on the specified layer.
	//
	// [MIXER_FILL](http://casparcg.com/wiki/CasparCG_2.0_AMCP_Protocol#MIXER_FILL)
	ccg.prototype.mixer_fill = function (channel, options, cb) {
		s_options = options.x + " " + options.y + " " + options.x_scale + " " + options.y_scale + " "; //+ options.duration + " " + options.tween;
		sendMixerCommand(this, "FILL", channel, s_options, cb);
	};
	
	// ---
	// ccg.mixer_opacity
	// ---
	// Changes the opacity of the specified layer. The value is a float between 0 and 1.
	//
	// [MIXER_OPACITY](http://casparcg.com/wiki/CasparCG_2.0_AMCP_Protocol#MIXER_OPACITY)
	ccg.prototype.mixer_opacity = function (channel, opacity, cb) {
		sendMixerCommand(this, "OPACITY", channel, opacity, cb);
	};
	
	// ---
	// ccg.mixer_volume
	// ---
	// Changes the volume of the specified layer. The value is a float between 0 and 1.
	//
	// [MIXER_VOLUME](http://casparcg.com/wiki/CasparCG_2.0_AMCP_Protocol#MIXER_VOLUME)
	ccg.prototype.mixer_volume = function (channel, volume, cb) {
		sendMixerCommand(this, "VOLUME", channel, volume, cb);
	};
};