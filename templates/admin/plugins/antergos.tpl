<div class="col-lg-9">
	<div class="panel panel-default">
		<div class="panel-heading">Antergos Theme Settings</div>
		<div class="panel-body">
			<form>
				<label>Display Global Alert
					<input id="displayGlobalAlert" type="checkbox" data-field="displayGlobalAlert" />
				</label>
				<label>Subject
					<input id="globalAlertSubject" type="text" data-field="globalAlertSubject" />
				</label>
				<label>Message
					<textarea id="globalAlertMsg" data-field="globalAlertMsg"></textarea>
				</label>


			</form>
		</div>
	</div>
</div>

<div class="col-lg-3 acp-sidebar">
	<div class="panel panel-default">
		<div class="panel-heading">Save Settings</div>
		<div class="panel-body">
			<button class="btn btn-primary btn-md" id="save">Save Changes</button>
			<button class="btn btn-warning btn-md" id="revert">Revert Changes</button>
		</div>
	</div>
</div>

<script>
	require(['admin/settings'], function(Settings) {
		Settings.prepare();
	});
</script>
