<!-- IMPORT partials/breadcrumbs.tpl -->

<div class="row register">
	<div class="col-md-6 col-lg-6 col-lg-offset-3 col-md-offset-1">
		<div class="well well-lg">
			<h3 style="text-align: center; margin-bottom: 20px;">Forum Registration</h3>
			<div class="alert alert-danger<!-- IF !error --> hidden<!-- ENDIF !error -->" id="register-error-notify">
				<button type="button" class="close" data-dismiss="alert">&times;</button>
				<strong>[[error:registration-error]]</strong>
				<p>{error}</p>
			</div>
			<form component="register/local" class="form-horizontal" role="form" action="{config.relative_path}/register" method="post">
				<div class="form-group">
					<div class="col-lg-8">
						<label for="email" class="col-lg-4 control-label">[[register:email_address]]</label>
						<div class="input-group">
							<input class="form-control" type="text" placeholder="[[register:email_address_placeholder]]" name="email" id="email" autocorrect="off" autocapitalize="off" />
							<span class="input-group-addon">
								<span id="email-notify"><i class="fa fa-circle-o"></i></span>
							</span>
						</div>
						<span class="help-block">[[register:help.email]]</span>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-8">
						<label for="username" class="col-lg-4 control-label">[[register:username]]</label>
						<div class="input-group">
							<input class="form-control" type="text" placeholder="[[register:username_placeholder]]" name="username" id="username" autocorrect="off" autocapitalize="off" autocomplete="off" />
							<span class="input-group-addon">
								<span id="username-notify"><i class="fa fa-circle-o"></i></span>
							</span>
						</div>
						<span class="help-block">[[register:help.username_restrictions, {minimumUsernameLength}, {maximumUsernameLength}]]</span>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-8">
						<label for="password" class="col-lg-4 control-label">[[register:password]]</label>
						<div class="input-group">
							<input class="form-control" type="password" placeholder="[[register:password_placeholder]]" name="password" id="password" />
							<span class="input-group-addon">
								<span id="password-notify"><i class="fa fa-circle-o"></i></span>
							</span>
						</div>
						<span class="help-block">[[register:help.minimum_password_length, {minimumPasswordLength}]]</span>
					</div>
				</div>
				<div class="form-group">
					<div class="col-lg-8">
						<label for="password-confirm" class="col-lg-4 control-label">[[register:confirm_password]]</label>
						<div class="input-group">
							<input class="form-control" type="password" placeholder="[[register:confirm_password_placeholder]]" name="password-confirm" id="password-confirm" />
							<span class="input-group-addon">
								<span id="password-confirm-notify"><i class="fa fa-circle-o"></i></span>
							</span>
						</div>
					</div>
				</div>

				<!-- BEGIN regFormEntry -->
				<div class="form-group">
					<label for="register-{regFormEntry.styleName}" class="col-lg-4 control-label">{regFormEntry.label}</label>
					<div id="register-{regFormEntry.styleName}" class="col-lg-8">
						{{regFormEntry.html}}
					</div>
				</div>
				<!-- END regFormEntry -->

				<div class="form-group">
					<div class="col-lg-offset-4 col-lg-8">
						<hr />
						<button class="btn btn-primary btn-lg btn-block" id="register" type="submit">[[register:register_now_button]]</button>
					</div>
				</div>
				<input id="referrer" type="hidden" name="referrer" value="" />
				<input id="token" type="hidden" name="token" value="" />
			</form>
		</div>
	</div>
<script>
	$(document).ready(function(){
		setTimeout(function() {
			$('#register- .well').children().appendTo('#register-');
			$('#register- .well').remove();
			$('#register-').children('strong').appendTo('#register-');
			var regtxt = $('#register-').children('strong').text();
			$('#register-').children('strong').wrap('<span class="help-block"></span>');
			$('#register-').find('.help-block strong').remove();
			$('#register- .help-block').text(regtxt);
			$('#register- input').attr('placeholder', 'Answer Registration Question');
		}, 700);
	});
</script>
</div>
